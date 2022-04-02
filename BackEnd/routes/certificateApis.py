from routes import app
from bson import ObjectId
from flask import request
from models.certificate import Certificate

certificate_collection = app.db.certificate_atvstp;

@app.route('/certificate', methods=["GET"])
def get_certificate():
    try:
        list_of_certificate = certificate_collection.find({})
        certificates = []
        for certificate in list_of_certificate:
            certificates.append(certificate)
        return {'Result': 'Success',
                'List of certificates': f'{certificates}'}
    except Exception as e:
        return {'Result': 'Fail',
                'Message': 'Can not get data'}

@app.route('/certificate/<string:id>', methods=["GET"])
def get_certificate_by_id(certificate_id):
    try:
        certificate = certificate_collection.find({'id': ObjectId(certificate_id)})
        if certificate:
            return {'Result': 'Success',
                    'Grocery': f'{certificate}'}
        else:
            return {'Result': 'Fail',
                    'Message': 'Not found'}
    except Exception as e:
        return {'Result': 'Fail',
                'Message': 'Can not get data'}


@app.route('/certificate', methods=["POST"])
def create_certificate():
    data = request.get_json()
    new_certificate= Certificate(name=data['name'],
                                 manager=data['manager'],
                                 effective_time=data['effective_time'])
    try:
        certificate_collection.insert_one(new_certificate.to_dict())
        return {'Result': 'Success',
                'Message': 'Add successfully'}
    except Exception as e:
        return {'Result': 'Fail',
                'Message': 'Can not insert data'}


@app.route('/certificate/<string:id>', methods=["PUT"])
def update_certificate(certificate_id):
    data = request.get_json()
    time = utc.now()
    update = {'name': data['name'],
              'manager': data['manager'],
              'effective_time': data['effective_time'],
              'last_update': time}
    try:
        certificate_collection.find_one_and_update({'id': ObjectId(certificate_id)},
                                               {'$set': update})
        return {'Result': 'Success'}
    except Exception:
        return {'Result': 'Fail'}


@app.route('/certificate/<string:id', methods=["DELETE"])
def delete_certificate(certificate_id):
    try:
        certificate_collection.find_one_and_delete({id: ObjectId(certificate_id)})
        return {'Result': 'Success'}
    except:
        return {'Result': 'Fail'}
