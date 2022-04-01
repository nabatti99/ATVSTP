from flask import request
from routes import app
from bson.objectid import ObjectId
from bson.json_util import dumps
import flask

from models.administration_atvstp import Administration_ATVSTP as ad

administration_collection = app.db.administration_atvstp

total_row_per_page = 10 # so du lieu trong 1 trang: default

@app.route('/administration/read', methods=['GET'])
def administration_read():
    # get data using pagination
    data_from_client = request.args
    current_page = data_from_client.get('offset')
    if current_page is None:
        current_page = 1 # default page
    row_limit = data_from_client.get('limit') # so du lieu trong 1 trang: lay tu client
    if row_limit is None:
        row_limit = total_row_per_page
    total_row = administration_collection.count_documents({})
    offset = getOffset(int(current_page), int(row_limit))
    total_page = getTotalPage(total_row, int(row_limit))
    data = administration_collection.find().skip(offset).limit(int(row_limit))
    # check xem co tim kiem khong
    search_value = data_from_client.get('value')
    if search_value is not None:
        type_search = "name" # default
        if data_from_client.get('type_search') is not None:
            type_search = data_from_client.get('type_search');
        total_row = administration_collection.count_documents({type_search: {'$regex':search_value, '$options' : 'i'}})
        offset = getOffset(int(current_page), int(row_limit))
        total_page = getTotalPage(total_row, int(row_limit))
        data = administration_collection.find({type_search: {'$regex':search_value, '$options' : 'i'}}).skip(offset).limit(int(row_limit))
    list_data = list(data)
    if len(list_data) == 0:
        return {'result': 'no data'}
    json_data = dumps(list_data)
    result = '{"data":' + json_data + ', "total_page":"' + str(total_page) +'"' + '}'
    return result


@app.route('/administration/create', methods=['POST'])
def administration_create():
    data = request.get_json()
    new_administration = ad(name=data['name'],
                          phone_number=data['phone_number'],
                          responsible=data['responsible'])

    try:
        administration_collection.insert_one(new_administration.to_dict())
        return {'result': 'create successfully', 'administration data': new_administration.to_dict()}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


@app.route('/administration/update', methods=['PUT'])
def administration_update():
    data = request.get_json()
    new_administration = ad(name=data['name'],
                          phone_number=data['phone_number'],
                          responsible=data['responsible'])
    item_update = administration_collection.find_one({"_id": ObjectId(data['_id'])}) # object will be updated
    if item_update is None:
        return {'result': 'no data'}
    filter_update = {'_id': item_update['_id']}
    new_value = {"$set": new_administration.to_dict()}
    try:
        administration_collection.update_one(filter_update, new_value)
        return {'result': 'update successfully', 'administration data': new_administration.to_dict()}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


@app.route('/administration/delete', methods=['DELETE'])
def administration_delete():
    data = request.args
    oid = data.get('oid')
    if oid is None:
        return {'result': 'no data'}
    item_update = administration_collection.find_one({"_id": ObjectId(oid)}) # object will be deleted
    if item_update is None:
        return {'result': 'no data'}
    try:
        administration_collection.delete_one({"_id": item_update['_id']})
        return {'result': 'delete successfully'}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


# pagination util
def getOffset(page, limit):
    return (page - 1) * limit

def getTotalPage(total_row, limit):
    page = total_row // limit
    if total_row % limit == 0:
        return page
    return page + 1