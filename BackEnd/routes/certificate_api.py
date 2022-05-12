from routes import app, manager_required
from flask import request
from .pagination import pagination
from models.certificate import Certificate
from models.firebase import storage
from datetime import datetime
certificate_collection = app.db.certificate_atvstp;


@app.route('/certificate', methods=["GET"])
@manager_required("level_one")
def get_certificate(current_manager=None):
    list_certificate = []

    offset = int(request.args['offset'])
    limit = int(request.args['limit'])
    search_value = request.args['value']
    try:
        all_certificate = certificate_collection.find({
            'name': {'$regex': str(search_value)}
        })
        if all_certificate:
            for certificate in all_certificate:
                list_certificate.append(certificate)
            return pagination(path_dir=f'/certificate',
                              offset=offset,
                              limit=limit,
                              list_database=list_certificate)
        else:
            return {'Status': 'Fail',
                    'Message': 'Can not find any certificate in database'}, 401

    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not get data'}, 400


@app.route('/certificate/<string:certificate_name>', methods=["GET"])
@manager_required("level_one")
def get_certificate_by_name(current_manager=None, certificate_name=''):
    try:
        certificate = certificate_collection.find_one({'name': certificate_name})
        if certificate:
            return {'Result': 'Success',
                    'Certificate': certificate}
        else:
            return {'Status': 'Fail',
                    'Message': 'Not found certificate'}, 401
    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not get data'}, 400


@app.route('/certificate', methods=["POST"])
@manager_required("level_one")
def create_certificate(current_manager=None):
    data = request.get_json()
    last_update_time = datetime.utcnow()
    logger = check_input(data)
    if not logger:
        new_certificate = Certificate(name=data['name'],
                                      manager=data['manager'],
                                      effective_time=data['effective_time'],
                                      last_update=last_update_time)
        try:
            certificate_collection.insert_one(new_certificate.to_dict())
            return {'Status': 'Success',
                    'Message': 'Add successfully'}
        except Exception as e:
            return {'Status': 'Fail',
                    'Message': 'Can not insert data'}, 400
    else:
        return {'Status': 'Fail',
                'Message': logger}, 401


@app.route('/certificate/<string:certificate_name>', methods=["PUT"])
@manager_required("level_one")
def update_certificate(current_manager=None, certificate_name=''):
    data = request.get_json()
    last_update_time = datetime.utcnow()
    update = {'name': certificate_name,
              'manager': data['manager'],
              'effective_time': data['effective_time'],
              'last_update': last_update_time}
    try:
        certificate_collection.find_one_and_update({'name': certificate_name},
                                                   {'$set': update})
        return {'Status': 'Success'}
    except Exception:
        return {'Status': 'Fail'}, 400


@app.route('/certificate/<string:certificate_name>', methods=["DELETE"])
@manager_required("level_one")
def delete_certificate(current_manager=None, certificate_name=''):
    try:
        deleted_certificate = certificate_collection.find_one({'name': certificate_name})
        if deleted_certificate:
            delete_time = datetime.utcnow()
            certificate_collection.find_one_and_update({'name': certificate_name},
                                                       {'$set':
                                                            {'date_delete': delete_time}})

            return {'Status': 'Success',
                    'Message': f'Deleted certificate: {certificate_name}'}
        else:
            return {'Status': 'Fail',
                    'Message': 'Can not find this grocery in database'}, 401
    except Exception:
        return {'Status': 'Can not delete'}, 400


@app.route('/certificate/restore/<string:certificate_name>', methods=['PUT'])
@manager_required('level_one')
def restore_certificate(current_manager=None, certificate_name: str = ''):
    try:
        restored_certificate = certificate_collection.update_one({'name': certificate_name},
                                                                 {"$unset": {'date_delete': 1}})
        if restored_certificate:
            return {'Status': 'Success',
                    'Message': f'Restored certificate: {certificate_name}'}
        else:
            return {'Status': 'Fail',
                    'Message': 'Can not find this certificate in database'}, 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/certificate/save_image/<string:name>', methods=['POST'])
@manager_required('level_one')
def load_image_certificate(current_manager=None, name: str = ''):
    try:
        upload = request.files['upload']
        certificate = certificate_collection.find_one({'name': name})
        if certificate:
            save_dir = f'certificate_atvstp/{certificate["_id"]}.jpg'
            storage.child(save_dir).put(upload)
            certificate_collection.find_one_and_update({'name': name},
                                                       {"$set": {
                                                           "image_url": storage.child(save_dir).get_url(None)
                                                       }})
            return {'Status': 'Success',
                    'Message': f"Upload image successfully: {certificate['image_url']}"}
        else:
            return {'Status': 'Fail',
                    'Message': 'Can not find this certificate in database'}, 401

    except Exception as e:
        print(e)
        return {'Status': 'Fail',
                'Message': f'{e}'}, 400


def check_input(new_certificate):
    logger = {}
    try:
        new_certificate['name']
    except:
        logger['name'] = "No name"

    try:
        new_certificate['manager']
    except:
        logger['manager'] = "No manager"

    try:
        new_certificate['effective_time']
    except:
        logger['effective_time'] = "No effective time"

    return logger

