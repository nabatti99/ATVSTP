import datetime
import functools
from flask import request, make_response
from routes import app

from models.manager import Manager

from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt


manager_collection = app.db.manager


def manager_required(access_level):
    def decorator(func):
        @functools.wraps(func)
        def secure_function(*args, **kwargs):
            token, type_access = None, None
            if access_level == "one":
                type_access = ['admin']

            if access_level == 'two':
                type_access = ['admin', 'inspector']

            if 'access-token' in request.headers:
                token = request.headers['access-token']

            if not token:
                return {'message': "Invalid token. Registration and/or authentication required ",
                        'authenticated': False}, 401

            try:
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
                current_user = manager_collection.find_one({"_id": ObjectId(payload['_id'])})
                print(current_user['type'])
                if current_user['type'] in type_access:
                    return func(*args, **kwargs)
                else:
                    return {'results': "Fail",
                            'message': f"No permissions for {current_user['type']}"
                            }
            except jwt.ExpiredSignatureError as e:
                return {'message': "Expired token. Reauthentication required.",
                        'authenticated': False}, 401
            except (jwt.InvalidTokenError, Exception) as e:
                print(e)
                return {'message': "Invalid token. Registration an d/or authentication required ",
                        'authenticated': False}, 401

        return secure_function

    return decorator


@app.route('/register', methods=['POST'])
@manager_required("one")
def register():
    new_register = request.get_json()
    hashed_password = generate_password_hash(new_register['password'], method='sha256')

    new_manager = Manager(name=new_register['name'],
                          hash_password=hashed_password,
                          email=new_register['email'],
                          address=new_register['address'],
                          phone=new_register['phone'],
                          position=new_register['position'],
                          type=new_register['type'])

    verify = manager_collection.find_one({'name': new_manager.name})
    if verify is not None:
        return {'result': 'fail', 'reason': 'username is not unique!'}, 400

    try:
        manager_collection.insert_one(new_manager.to_dict())
        return {'result': 'success', 'user': new_manager.to_dict()}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('Could not sign in', 401, {'WWW-authenticate': 'Basic realm="Login to use!"'})

    current_user = manager_collection.find_one({'name': auth.username})

    if not current_user:
        return make_response('Could not sign in', 401, {'WWW-authenticate': 'Basic realm="Wrong credential!"'})
    if check_password_hash(current_user['hash_password'], auth.password):
        token = gen_token(current_user['_id'])
        return {'token': token}

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
