from datetime import datetime
import functools
from flask import request, make_response, render_template, jsonify
from routes import app
from models.manager import Manager
from models.firebase import storage
from .management_email import gen_password, send_email_new_password
from .pagination import pagination
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

manager_collection = app.db.manager
admin_atvstp = app.db.administration_atvstp

fail_status = 'Fail'
success_status = 'Success'


def response_status(status, message):
    return jsonify({
        'Status': status,
        'Message': message
    })


@app.route('/')
def home():
    return render_template('index.html')


def manager_required(access_level):
    def decorator(func):
        @functools.wraps(func)
        def secure_function(*args, **kwargs):
            token, type_access = None, None
            if access_level == "level_two":
                type_access = ['admin']

            if access_level == 'level_one':
                type_access = ['admin', 'inspector']

            if 'access-token' in request.headers:
                token = request.headers['access-token']

            if not token:
                return {'Message': "Invalid token. Registration and / or authentication required ",
                        'authenticated': False}, 401

            try:
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
                current_manager = manager_collection.find_one({"_id": ObjectId(payload['_id'])})
                if current_manager['type_manager'] in type_access:
                    return func(current_manager, *args, **kwargs)
                else:
                    return {'Message': f"No permissions for {current_manager['type_manager']}"}
            except jwt.ExpiredSignatureError as e:
                return {'Message': "Expired token. Reauthentication required.",
                        'authenticated': False}, 401
            except (jwt.InvalidTokenError, Exception) as e:
                return {'Message': "Invalid token. Registration and / or authentication required ",
                        'authenticated': False}, 401

        return secure_function

    return decorator


@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('Could not sign in', 401, {'WWW-authenticate': 'Basic realm="Login to use!"'})

    current_manager = manager_collection.find_one({
        "$or": [
            {'name': {'$in': [auth.username]}},
            {'email': {'$in': [auth.username]}},
        ]
    })
    if check_password_hash(current_manager['hash_password'], auth.password):
        token = gen_token(current_manager['_id'])
        return {'token': token}
    else:
        return make_response('Could not sign in', 401, {'WWW-authenticate': 'Basic realm="Wrong credential!"'})


@app.route('/gen_token', methods=['GET'])
def gen_token(_id):
    payload = {
        '_id': str(_id),
        # 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=120),
        # 'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload,
                       app.config['SECRET_KEY'],
                       algorithm='HS256')
    return token


@app.route('/manager/create_new_manager', methods=['POST'])
@manager_required("level_two")
def create_new_manager(current_manager=None):
    new_register = request.get_json()

    # create password for new manager
    new_password = gen_password()
    hashed_password = generate_password_hash(new_password, method='sha256')

    logger = checked_manager(new_register)
    if logger:
        return logger
    else:

        new_inspector = Manager(name=new_register['name'],
                                hash_password=str(hashed_password),
                                email=new_register['email'],
                                address=new_register['address'],
                                phone=new_register['phone'],
                                work_from=new_register['work_from'],
                                type_manager=new_register['type_manager'],
                                role=new_register['role'])

        verify = manager_collection.find_one({'name': new_register['name']})
        if verify is not None:
            return response_status(status=fail_status,
                                   message='username is not unique!'), 401

        try:
            # add manager to admin_atvstp
            admin_atvstp.update_one({'name': new_inspector['work_from']},
                                    {'$push': {
                                        f'responsible.{new_inspector["role"]}': new_inspector['email']
                                    }})

            current_admin_atvstp = admin_atvstp.find_one_and_update({'name': new_register['work_from']},
                                                                    {
                                                                        '$push': {
                                                                            f'responsible.{new_register["role"]}':
                                                                                new_register['email']
                                                                        }
                                                                    })
            if current_admin_atvstp:
                send_email_new_password(new_inspector.to_dict(), new_password)
                manager_collection.insert_one(new_inspector.to_dict())
                return response_status(status=success_status,
                                       message=new_inspector.to_dict())
            else:
                return response_status(status=fail_status,
                                       message=f'Do not have {new_register["work_from"]} administration atvstp in database')
        except Exception as e:
            return {'Type Error': e}, 400


@app.route('/manager/get_all_manager', methods=['GET'])
@manager_required('level_two')
def get_all_manager(current_manager=None):
    list_manager = []

    offset = int(request.args['offset'])
    limit = int(request.args['limit'])

    try:
        all_manager = manager_collection.find({}).sort('name')
        if all_manager:
            for mn in all_manager:
                list_manager.append(Manager().db_to_dict(mn))
            return {'all_manager': pagination(path_dir=f'/manager/get_all_manager',
                                              offset=offset,
                                              limit=limit,
                                              list_database=list_manager)}
        else:
            return response_status(status=fail_status,
                                   message='Can not find any manager in database'), 401


    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/get_a_manager/<string:email>', methods=['GET'])
@manager_required('level_one')
def get_a_manager(current_manager=None, email: str = ''):
    try:
        the_manager = manager_collection.find_one({'email': email})
        if the_manager:
            return Manager().db_to_dict(the_manager)
        else:
            return response_status(status=fail_status,
                                   message=f'Can not find manager have email {email} in database, please try again!'), \
                   401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/update_a_manager/<string:email>', methods=['PUT'])
@manager_required("level_one")
def update_a_manager(current_manager=None, email: str = ''):
    try:
        updated_manager = request.get_json()

        logger = checked_manager(updated_manager)

        if not logger:
            if current_manager['type_manager'] == 'admin':
                del_conf_mn = manager_collection.find_one_and_update({'email': email},
                                                                     {'$set': {
                                                                         'name': updated_manager['name'],
                                                                         'phone': updated_manager['phone'],
                                                                         'address': updated_manager['address'],
                                                                         'work_from': updated_manager['work_from'],
                                                                         'type_manager': updated_manager[
                                                                             'type_manager'],
                                                                         'role': updated_manager['role']
                                                                     }})
            elif current_manager['type_manager'] == 'inspector':
                del_conf_mn = manager_collection.find_one_and_update({'email': email},
                                                                     {'$set': {
                                                                         'name': updated_manager['name'],
                                                                         'phone': updated_manager['phone'],
                                                                         'address': updated_manager['address'],
                                                                     }})
            else:
                return response_status(status=fail_status,
                                       message=f'You is a {current_manager["type_manager"]}, '
                                               f'can not update to {updated_manager["type_manager"]}'), 401

            if del_conf_mn:
                return response_status(status=success_status,
                                       message=f'Updated user have {email}')
            else:
                return response_status(status=fail_status,
                                       message=f'Do not find manager have email: {email} '
                                               f'in database, please check again!'), 401

        else:
            return response_status(status=fail_status, message=logger), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/delete_a_manager/<string:email>', methods=['DELETE'])
@manager_required("level_two")
def delete_a_manager(current_manager=None, email: str = ''):
    try:
        the_manager = manager_collection.find_one({'email': email})
        if the_manager['type_manager'] == 'admin':
            return response_status(status=fail_status,
                                   message=f'You is a {current_manager["type_manager"]} can not delete user type: '
                                           f'{the_manager["type_manager"]}')
        else:

            # delete profile manager in firebase
            # if the_manager['image_url']:
            #     storage.delete(f'manager/{the_manager["_id"]}.jpg', None)

            # delete field current manager in collection 'admin_atvstp'
            admin_atvstp.update_one({'name': the_manager['work_from']},
                                    {'$pull': {
                                        f'responsible.{the_manager["role"]}': the_manager['email']
                                    }})

            # deleted_manager = manager_collection.delete_one({'email': email})
            deleted_manager = manager_collection.update_one({'email': email},
                                                            {"$set": {'date_delete': datetime.utcnow()}})

            if deleted_manager:
                return response_status(status=success_status,
                                       message=f'Deleted user {email}')
            else:
                return response_status(status=fail_status,
                                       message=f'Do not have user {email} in database'), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/restore_a_manager/<string:email>', methods=['PUT'])
@manager_required("level_two")
def restore_a_manager(current_manager=None, email: str = ''):
    try:
        restored_manager = manager_collection.find_one_and_update({'email': email},
                                                                  {"$unset": {'date_delete': 1}})

        # restore role of current manager in 'admin_atvstp'
        admin_atvstp.update_one({'name': restored_manager['work_from']},
                                {'$push': {
                                    f'responsible.{restored_manager["role"]}': restored_manager['email']
                                }})
        if restored_manager:
            return response_status(status=success_status,
                                   message=f'Restored user {email}')
        else:
            return response_status(status=fail_status,
                                   message=f'Do not have user {email} in database'), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/delete_all_manager', methods=['DELETE'])
@manager_required('level_two')
def delete_all_manager(current_manager=None):
    try:
        # TODO delete all images firebase
        all_manager = manager_collection.delete_many({})
        if all_manager:
            return response_status(status=success_status,
                                   message='Deleted all manager in database!')
        else:
            return response_status(status=fail_status,
                                   message='Can not find any manager in database'), 401

    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/new_password/<string:email>', methods=['POST'])
@manager_required('level_two')
def create_new_password(current_manager=None, email: str = ''):
    try:
        new_password = gen_password()
        the_manager = manager_collection.find_one_and_update({"email": email},
                                                             {'$set': {
                                                                 'hash_password': generate_password_hash(new_password,
                                                                                                         method='sha256')
                                                             }})

        if the_manager:
            send_email_new_password(the_manager, new_password)
            return response_status(status=success_status,
                                   message='Send Email Success!')

        else:
            return response_status(status=fail_status,
                                   message=f'Do not have manager {email} in database'), 401

    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/search', methods=['POST'])
@manager_required('level_two')
def get_managers(current_manager=None):
    try:
        search_value = request.args['value']
        offset = int(request.args['offset'])
        limit = int(request.args['limit'])

        some_managers = manager_collection.find({
            "$or": [
                {'name': {'$regex': str(search_value)}},
                {'email': {'$regex': str(search_value)}},
            ]
        })

        list_managers = []
        if some_managers:
            for mn in some_managers:
                list_managers.append(Manager().db_to_dict(mn))
            # records = int(len(list_managers) / limit) + (len(list_managers) % limit > 0)
            return pagination(path_dir=f'manager/search',
                              offset=offset,
                              limit=limit,
                              value=search_value,
                              list_database=list_managers)
        else:
            return response_status(status=fail_status,
                                   message='Can not find any manager in database'), 401

    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/save_image/<string:email>', methods=['POST'])
@manager_required('level_one')
def load_image_profile_manager(current_manager=None, email: str = ''):
    try:
        upload = request.files['upload']
        the_manager = manager_collection.find_one({'email': email})
        save_dir = f'manager/{the_manager["_id"]}.jpg'
        if the_manager:

            storage.child(save_dir).put(upload)
            manager_collection.find_one_and_update({'email': email},
                                                   {"$set": {
                                                       "image_url": storage.child(save_dir).get_url(None)
                                                   }})
        else:
            return response_status(status=fail_status,
                                   message=f"Upload success profile manager:{the_manager['image_url']}"), 401

        return response_status(status=success_status,
                               message={"image uploaded": storage.child(save_dir).get_url(None)})

    except Exception as e:
        return {'Type Error': e}, 400


def checked_manager(new_manager):
    logger = {}
    try:
        new_manager['name']
    except:
        logger['name'] = 'No name'
    try:
        new_manager['address']
    except:
        logger['address'] = 'No address'
    try:
        new_manager['phone']
    except:
        logger['phone'] = 'No phone'
    try:
        new_manager['work_from']
    except:
        logger['work_from'] = 'No work_from'
    try:
        new_manager['type_manager']
    except:
        logger['type_manager'] = 'No type'
    try:
        new_manager['role']
    except:
        logger['role'] = 'No role'

    return logger
