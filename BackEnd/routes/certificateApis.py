from datetime import time

from routes import app, manager_required
from bson import ObjectId
from flask import request
import time
from .pagination import pagination
from models.certificate import Certificate

certificate_collection = app.db.certificate_atvstp;


@app.route('/certificate', methods=["GET"])
@manager_required("level-one")
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


@app.route('/certificate', methods=["POST"])
@manager_required("level_one")
def create_certificate(current_manager=None):
    data = request.get_json()
    new_certificate = Certificate(name=data['name'],
                                  manager=data['manager'],
                                  effective_time=data['effective_time'])
    try:
        certificate_collection.insert_one(new_certificate.to_dict())
        return {'Status': 'Success',
                'Message': 'Add successfully'}
    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not insert data'}, 400


@app.route('/certificate/<string:name>', methods=["PUT"])
@manager_required("level_one")
def update_certificate(current_manager=None, certificate_name=''):
    data = request.get_json()
    seconds = time.time()
    last_update_time = time.ctime(seconds)
    update = {'name': data['name'],
              'manager': data['manager'],
              'effective_time': data['effective_time'],
              'last_update': last_update_time}
    try:
        certificate_collection.find_one_and_update({'name': certificate_name},
                                                   {'$set': update})
        return {'Status': 'Success'}
    except Exception:
        return {'Status': 'Fail'}, 400


@app.route('/certificate/<string:name>', methods=["DELETE"])
@manager_required("level_one")
def delete_certificate(current_manager=None, certificate_name=''):
    try:
        certificate_collection.find_one_and_delete({'name': certificate_name})
        return {'Status': 'Success'}
    except:
        return {'Status': 'Fail'}, 400
