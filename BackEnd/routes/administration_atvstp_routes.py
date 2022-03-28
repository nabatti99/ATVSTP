from flask import request
from routes import app
from bson.objectid import ObjectId
from bson.json_util import dumps
import flask

from models.administration_atvstp import Administration_ATVSTP as ad

administration_collection = app.db.administration_atvstp

total_row_per_page = 2 # so du lieu trong 1 trang

@app.route('/administration/index', methods=['GET'])
def index_administration():
    # get data using pagination
    data = request.args
    current_page = data.get('page')
    if current_page is None:
        current_page = 1 # default page
    total_row = administration_collection.count_documents({})
    offset = getOffset(int(current_page))
    total_page = getTotalPage(total_row)
    data = administration_collection.find().skip(offset).limit(total_row_per_page)
    list_data = list(data)
    if len(list_data) == 0:
        return {'result': 'No data'}
    json_data = dumps(list_data)
    result = '{"data":' + json_data + ', "total_page":"' + str(total_page) +'"' + '}'
    return result


@app.route('/administration/search', methods=['GET'])
def search():
    data = request.args # get data search by query
    current_page = data.get('page')
    if current_page is None:
        current_page = 1 # default page
    name = data.get('name')
    if name is None:
        return {'result': 'No data'}
    total_row = administration_collection.count_documents({"name": {'$regex':name, '$options' : 'i'}})
    offset = getOffset(int(current_page))
    total_page = getTotalPage(total_row)
    data = administration_collection.find({"name": {'$regex':name, '$options' : 'i'}}).skip(offset).limit(total_row_per_page)
    list_data = list(data)
    if len(list_data) == 0:
        return {'result': 'No data'}
    json_data = dumps(list_data)
    result = '{"data":' + json_data + ', "total_page":"' + str(total_page) +'"' + '}'
    return result


@app.route('/administration/add', methods=['POST'])
def add_administration():
    data = request.get_json()
    new_administration = ad(name=data['name'],
                          phone_number=data['phone_number'],
                          responsible=data['responsible'])

    try:
        administration_collection.insert_one(new_administration.to_dict())
        return {'result': 'insert successfully', 'administration data': new_administration.to_dict()}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


@app.route('/administration/update', methods=['PUT'])
def update_administration():
    data = request.get_json()
    new_administration = ad(name=data['name'],
                          phone_number=data['phone_number'],
                          responsible=data['responsible'])
    item_update = administration_collection.find_one({"_id": ObjectId(data['_id'])}) # object will be updated
    if item_update is None:
        return {'result': 'No data'}
    filter_update = {'_id': item_update['_id']}
    new_value = {"$set": new_administration.to_dict()}
    try:
        administration_collection.update_one(filter_update, new_value)
        return {'result': 'update successfully', 'administration data': new_administration.to_dict()}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


@app.route('/administration/delete', methods=['DELETE'])
def delete_administration():
    data = request.args
    oid = data.get('oid')
    if oid is None:
        return {'result': 'No data'}
    item_update = administration_collection.find_one({"_id": ObjectId(oid)}) # object will be deleted
    if item_update is None:
        return {'result': 'No data'}
    try:
        administration_collection.delete_one({"_id": item_update['_id']})
        return {'result': 'delete successfully'}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


# pagination util
def getOffset(page):
    return (page - 1) * total_row_per_page

def getTotalPage(total_row):
    page = total_row // total_row_per_page
    if total_row % total_row_per_page == 0:
        return page
    return page + 1