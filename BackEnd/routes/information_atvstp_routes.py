from flask import request, jsonify
from routes import app
from bson.objectid import ObjectId
import flask
import time

from models.information_atvstp import InformationATVSTP as infor

information_collection = app.db.information_atvstp
manager_collection = app.db.manager

total_row_per_page = 10 # so du lieu trong 1 trang: default
fail_status = 'Fail'
success_status = 'Success'

@app.route('/information/read', methods=['GET'])
def information_read():
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
    total_row = information_collection.count_documents({})
    offset = getOffset(int(current_page), int(row_limit))
    data = information_collection.find().skip(offset).limit(int(row_limit))
    # check xem co tim kiem khong
    search_value = data_from_client.get('value')
    if search_value is not None:
        total_row = information_collection.count_documents({
            "$or": [
                {'title': {'$regex':search_value, '$options' : 'i'}},
                {'content': {'$regex':search_value, '$options' : 'i'}}
            ]
        })
        offset = getOffset(int(current_page), int(row_limit))
        data = information_collection.find({
            "$or": [
                {'title': {'$regex':search_value, '$options' : 'i'}},
                {'content': {'$regex':search_value, '$options' : 'i'}}
            ]
        }).skip(offset).limit(int(row_limit))
    list_data = list(data)
    result = {"data": list_data, "records": total_row}
    return result


@app.route('/information/read/<oid>', methods=['GET'])
def information_read_by_id(oid):
    try:
        information = information_collection.find_one({"_id": ObjectId(oid)})
        if information is not None:
            return jsonify(information)
        else:
            return response_status(fail_status, f'Can not find information with id {oid} in database'), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/information/create', methods=['POST'])
def information_create():
    data = request.get_json()
    # validate data
    user = manager_collection.find_one({"email": data['writer']})
    if user is None:
        return response_status(fail_status, "Data error")
    if data['title'] == "" or data['content'] == "":
        return response_status(fail_status, "Data error")
    current_time = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
    new_information = infor(title=data['title'],
                          content=data['content'],
                          writer=data['writer'],
                          edit_by=None,
                          delete_status=1,
                          create_at=current_time,
                          update_at=None)
    try:
        information_collection.insert_one(new_information.to_dict())
        return response_status(success_status, new_information.to_dict())
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/information/update', methods=['PUT'])
def information_update():
    data = request.get_json()
    user = manager_collection.find_one({"email": data['edit_by']})
    if user is None:
        return response_status(fail_status, "Data error")
    if data['title'] == "" or data['content'] == "":
        return response_status(fail_status, "Data error")
    item_update = information_collection.find_one({"_id": ObjectId(data['_id'])}) # object will be updated
    if item_update is None:
        return response_status(fail_status, "Data not exist")
    current_time = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
    new_information = infor(title=data['title'],
                          content=data['content'],
                          writer=item_update['writer'],
                          edit_by=data['edit_by'],
                          delete_status=item_update['delete_status'],
                          create_at=item_update['create_at'],
                          update_at=current_time)
    filter_update = {'_id': item_update['_id']}
    new_value = {"$set": new_information.to_dict()}
    try:
        information_collection.update_one(filter_update, new_value)
        return response_status(success_status, new_information.to_dict())
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/information/delete', methods=['DELETE'])
def information_delete():
    data = request.args
    oid = data.get('_id')
    if oid is None:
        return response_status(fail_status, "Data not exist")
    item_update = information_collection.find_one({"_id": ObjectId(oid)}) # object will be deleted
    if item_update is None:
        return response_status(fail_status, "Data not exist")
    try:
        information_collection.delete_one({"_id": item_update['_id']})
        return response_status(success_status, "Delete successfully")
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/information/disable', methods=['PUT'])
def information_disable():
	# xoa mem => thay doi delete status
    data = request.get_json()
    current_time = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
    item_update = information_collection.find_one({"_id": ObjectId(data['_id'])}) # object will be deleted
    if item_update is None:
        return response_status(fail_status, "Data not exist")
    filter_update = {'_id': item_update['_id']}
    new_value = {"$set": {"delete_status": 0, "update_at": current_time}}
    try:
        information_collection.update_one(filter_update, new_value)
        return response_status(success_status, "Disable successfully")
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