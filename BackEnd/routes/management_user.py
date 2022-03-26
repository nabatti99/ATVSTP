import datetime
import functools
from flask import request, make_response, render_template
from run import app
from models.manager import Manager
from .management_email import gen_password, send_email_new_password
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

manager_collection = app.db.manager


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

    current_manager = manager_collection.find_one({'name': auth.username,
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


@app.route('/manager', methods=['POST'])
# @manager_required("level_two")
def create_new_manager(current_manager=None):
    new_register = request.get_json()

    hashed_password = generate_password_hash(new_register['password'], method='sha256')
    logger = checked_manager(new_register)
    if logger:
        return logger
    else:
        new_inspector = Manager(name=new_register['name'],
                                hash_password=hashed_password,
                                email=new_register['email'],
                                address=new_register['address'],
                                phone=new_register['phone'],
                                position=new_register['position'],
                                type_manager=new_register['type_manager'])

        verify = manager_collection.find_one({'name': new_inspector.name})
        if verify is not None:
            return {'Status': 'fail', 'reason': 'username is not unique!'}, 401

        try:
            manager_collection.insert_one(new_inspector.to_dict())
            return {'Status': 'success', 'user': new_inspector.to_dict()}
        except Exception as e:
            return {'Type Error': e}, 400


@app.route('/manager/get_all_manager', methods=['GET'])
@manager_required('level_two')
def get_all_manager(current_manager=None):
    list_manager = []
    type_manager = request.args.get('type_manager')
    try:
        all_manager = manager_collection.find({'type_manager': type_manager})
        if all_manager:
            for mn in all_manager:
                list_manager.append(Manager().db_to_dict(mn))
            return {'type manager': str(type_manager),
                    'all_manager': list_manager}
        else:
            return {'Status': 'Fail',
                    "Message": f'Can not find any {type_manager}'}, 401

    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/get_a_manager/<string:_id>', methods=['GET'])
# @manager_required('level_two')
def get_a_manager(current_manager=None, _id: str = ''):
    try:
        the_manager = manager_collection.find_one({'_id': ObjectId(_id)})
        if the_manager:
            return Manager().db_to_dict(the_manager)
        else:
            return {'Status': 'Fail',
                    'Message': f'Can not find manager have id {_id} in database, please try again!'}, 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/update_a_manager/<string:_id>', methods=['PUT'])
@manager_required("level_one")
def update_a_manager(current_manager=None, _id: str = ''):
    try:
        updated_manager = request.get_json()

        logger = checked_manager(updated_manager)

        if not logger:
            if current_manager['type_manager'] == 'admin':
                del_conf_mn = manager_collection.find_one_and_update({'_id': ObjectId(_id)},
                                                                     {'$set': {
                                                                         'name': updated_manager['name'],
                                                                         'email': updated_manager['email'],
                                                                         'phone': updated_manager['phone'],
                                                                         'address': updated_manager['address'],
                                                                         'position': updated_manager['position'],
                                                                         'type_manager': updated_manager['type_manager']
                                                                     }})
            elif current_manager['type_manager'] == 'inspector':
                del_conf_mn = manager_collection.find_one_and_update({'_id': ObjectId(_id)},
                                                                     {'$set': {
                                                                         'name': updated_manager['name'],
                                                                         'email': updated_manager['email'],
                                                                         'phone': updated_manager['phone'],
                                                                         'address': updated_manager['address'],
                                                                     }})
            else:
                return {'Status': 'Fail',
                        'Message': f'You is a {current_manager["type_manager"]}, '
                                   f'can not update to {updated_manager["type_manager"]}'}, 401

            if del_conf_mn:
                return {'Status': 'Success',
                        'Message': f'Updated user {_id}'}
            else:
                return {'Status': 'Fail',
                        'Message': f'Do not find manager have id: {_id} in database, please check again!'}
        else:
            return {'Status': 'fail',
                    'Message': logger}
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/<string:_id>', methods=['DELETE'])
# @manager_required("level_two")
def delete_a_manager(current_manager=None, _id: str = ''):
    try:
        the_manager = manager_collection.find_one({'_id': ObjectId(_id)})
        if the_manager['type_manager'] == 'admin':
            return {'Status': 'Fail!',
                    'Message': f'You is a {current_manager["type_manager"]} can not delete user type: '
                               f'{the_manager["type_manager"]}'}
        else:
            deleted_manager = manager_collection.delete_one({'_id': ObjectId(_id)})
            if deleted_manager:
                return {'Status': 'Success!',
                        'Message': f'Deleted user {_id}'}
            else:
                return {'Status': 'Fail!',
                        'Message': f'Do not have user {_id} in database'}
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager', methods=['DELETE'])
# @manager_required('level_two')
def delete_all_manager(current_manager=None):
    try:
        all_manager = manager_collection.delete_many({})
        if all_manager:
            return {'Status': 'Success!',
                    'Message': 'Deleted all manager in database!'}
        else:
            return {'Status': 'Fail!',
                    'Message': 'Can not find any manager in database'}, 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/manager/new_password/<string:_id>', methods=['POST'])
# @manager_required('level_two')
def create_new_password(current_manager=None, _id: str = ''):
    try:
        new_password = gen_password()
        the_manager = manager_collection.find_one_and_update({'_id': ObjectId(_id)},
                                                             {'$set': {
                                                                 'hash_password': generate_password_hash(new_password,
                                                                                                         method='sha256')
                                                             }})

        if the_manager:
            send_email_new_password(the_manager, new_password)
            return {'Message': 'Send Email Success!'}
        else:
            return {'Result': 'Fail',
                    'Message': f'Do not have manager {_id} in database '}, 401
    except Exception as e:
        return {'Type Error': e}, 400


def checked_manager(new_manager):
    logger = {}
    try:
        new_manager['name']
    except:
        logger['name'] = 'No name'
    try:
        new_manager['email']
    except:
        logger['email'] = 'No email'
    try:
        new_manager['password']
    except:
        logger['password'] = 'No password'
    try:
        new_manager['address']
    except:
        logger['address'] = 'No address'
    try:
        new_manager['phone']
    except:
        logger['phone'] = 'No phone'
    try:
        new_manager['position']
    except:
        logger['position'] = 'No position'
    try:
        new_manager['type_manager']
    except:
        logger['type_manager'] = 'No type'
    return logger





