from flask import request, jsonify
from routes import app
from bson.objectid import ObjectId
import flask
import time

from models.administration_atvstp import Administration_ATVSTP as ad

administration_collection = app.db.administration_atvstp

total_row_per_page = 10 # so du lieu trong 1 trang: default
fail_status = 'Fail'
success_status = 'Success'

@app.route('/administration/read', methods=['GET'])
def administration_read():
    # get data using pagination
    data_from_client = request.args
    current_page = data_from_client.get('offset')
    if current_page is None:
        current_page = 0 # default page
    row_limit = data_from_client.get('limit') # so du lieu trong 1 trang: lay tu client
    if row_limit is None:
        row_limit = total_row_per_page
    # check format error
    try:
        int(current_page)
        int(row_limit)
    except Exception as e:
        return response_status(fail_status, "Format error from URL")
    total_row = administration_collection.count_documents({})
    offset = getOffset(int(current_page), int(row_limit))
    total_page = getTotalPage(total_row, int(row_limit))
    data = administration_collection.find().skip(offset).limit(int(row_limit))
    # check xem co tim kiem khong
    search_value = data_from_client.get('value')
    if search_value is not None:
        total_row = administration_collection.count_documents({
            "$or": [
                {"name": {'$regex':search_value, '$options' : 'i'}}
            ]
        })
        offset = getOffset(int(current_page), int(row_limit))
        total_page = getTotalPage(total_row, int(row_limit))
        data = administration_collection.find({
            "$or": [
                {"name": {'$regex':search_value, '$options' : 'i'}}
            ]
        }).skip(offset).limit(int(row_limit))
    list_data = list(data)
    result = {"data": list_data, "total_page": total_page}
    return result


@app.route('/administration/read/<oid>', methods=['GET'])
def administration_read_by_id(oid):
    try:
        administration = administration_collection.find_one({"_id": ObjectId(oid)})
        if administration is not None:
            return jsonify(administration)
        else:
            return response_status(fail_status, f'Can not find administration with id {oid} in database'), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/administration/create', methods=['POST'])
def administration_create():
    data = request.get_json()
    # validate data
    if data['name'] == '' or data['phone_number'] == '':
        return response_status(fail_status, "Data error")
    new_administration = ad(name=data['name'],
                          phone_number=data['phone_number'],
                          responsible=[])

    try:
        administration_collection.insert_one(new_administration.to_dict())
        response_status(success_status, new_administration.to_dict())
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/administration/update', methods=['PUT'])
def administration_update():
    data = request.get_json()
    # validate data
    if data['name'] == '' or data['phone_number'] == '':
        return response_status(fail_status, "Data error")
    item_update = administration_collection.find_one({"_id": ObjectId(data['_id'])}) # object will be updated
    if item_update is None:
        return response_status(fail_status, "Data not exist")
    new_administration = ad(name=data['name'],
                          phone_number=data['phone_number'],
                          responsible=item_update['responsible'])
    filter_update = {'_id': item_update['_id']}
    new_value = {"$set": new_administration.to_dict()}
    try:
        administration_collection.update_one(filter_update, new_value)
        return response_status(success_status, new_administration.to_dict())
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/administration/delete', methods=['DELETE'])
def administration_delete():
    data = request.args
    oid = data.get('_id')
    if oid is None:
        return response_status(fail_status, "Data not exist")
    item_update = administration_collection.find_one({"_id": ObjectId(oid)}) # object will be deleted
    if item_update is None:
        return response_status(fail_status, "Data not exist")
    try:
        administration_collection.delete_one({"_id": item_update['_id']})
        return response_status(success_status, "Delete successfully")
    except Exception as e:
        return {'Type Error': e}, 400


# pagination util
def getOffset(page, limit):
    return page * limit

def getTotalPage(total_row, limit):
    page = total_row // limit
    if total_row % limit == 0:
        return page
    return page + 1

# return api
def response_status(status, message):
    return jsonify({
        'Status': status,
        'Message': message
    })