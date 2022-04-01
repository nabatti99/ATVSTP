from flask import request
from routes import app
from bson.objectid import ObjectId
from bson.json_util import dumps
import flask
import time

from models.information_atvstp import InformationATVSTP as infor

information_collection = app.db.information_atvstp

total_row_per_page = 10 # so du lieu trong 1 trang: default

@app.route('/information/read', methods=['GET'])
def information_read():
    # get data using pagination
    data_from_client = request.args
    current_page = data_from_client.get('offset')
    if current_page is None:
        current_page = 1 # default page
    row_limit = data_from_client.get('limit') # so du lieu trong 1 trang: lay tu client
    if row_limit is None:
        row_limit = total_row_per_page
    total_row = information_collection.count_documents({})
    offset = getOffset(int(current_page), int(row_limit))
    total_page = getTotalPage(total_row, int(row_limit))
    data = information_collection.find().skip(offset).limit(int(row_limit))
    # check xem co tim kiem khong
    search_value = data_from_client.get('value')
    if search_value is not None:
        type_search = "title" # default
        if data_from_client.get('type_search') is not None:
            type_search = data_from_client.get('type_search');
        total_row = information_collection.count_documents({type_search: {'$regex':search_value, '$options' : 'i'}})
        offset = getOffset(int(current_page), int(row_limit))
        total_page = getTotalPage(total_row, int(row_limit))
        data = information_collection.find({type_search: {'$regex':search_value, '$options' : 'i'}}).skip(offset).limit(int(row_limit))
    list_data = list(data)
    if len(list_data) == 0:
        return {'result': 'no data'}
    json_data = dumps(list_data)
    result = '{"data":' + json_data + ', "total_page":"' + str(total_page) +'"' + '}'
    return result


@app.route('/information/create', methods=['POST'])
def information_create():
    data = request.get_json()
    current_time = time.strftime("%H:%M:%S %d-%m-%Y", time.localtime())
    new_information = infor(title=data['title'],
    					  area=data['area'],
                          content=data['content'],
                          writer=ObjectId(data['writer']),
                          edit_by=ObjectId(data['writer']),
                          delete_status=1,
                          create_at=current_time,
                          update_at=current_time)
    try:
        information_collection.insert_one(new_information.to_dict())
        return {'result': 'create successfully', 'information data': new_information.to_dict()}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


@app.route('/information/update', methods=['PUT'])
def information_update():
    data = request.get_json()
    current_time = time.strftime("%H:%M:%S %d-%m-%Y", time.localtime())
    item_update = information_collection.find_one({"_id": ObjectId(data['_id'])}) # object will be updated
    if item_update is None:
        return {'result': 'no data'}
    new_information = infor(title=data['title'],
    					  area=data['area'],
                          content=data['content'],
                          writer=item_update['writer'],
                          edit_by=ObjectId(data['edit_by']),
                          delete_status=item_update['delete_status'],
                          create_at=item_update['create_at'],
                          update_at=current_time)
    filter_update = {'_id': item_update['_id']}
    new_value = {"$set": new_information.to_dict()}
    try:
        information_collection.update_one(filter_update, new_value)
        return {'result': 'update successfully', 'information data': new_information.to_dict()}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


@app.route('/information/delete', methods=['DELETE'])
def information_delete():
    data = request.args
    oid = data.get('oid')
    if oid is None:
        return {'result': 'no data'}
    item_update = information_collection.find_one({"_id": ObjectId(oid)}) # object will be deleted
    if item_update is None:
        return {'result': 'no data'}
    try:
        information_collection.delete_one({"_id": item_update['_id']})
        return {'result': 'delete successfully'}
    except Exception as e:
        return {'result': 'fail', 'reason': e}, 400


@app.route('/information/disable', methods=['PUT'])
def information_disable():
	# xoa mem => thay doi delete status
	data = request.get_json()
	current_time = time.strftime("%H:%M:%S %d-%m-%Y", time.localtime())
	item_update = information_collection.find_one({"_id": ObjectId(data['_id'])}) # object will be deleted
	if item_update is None:
		return {'result': 'no data'}
	filter_update = {'_id': item_update['_id']}
	new_value = {"$set": {"delete_status": 0, "update_at": current_time}}
	try:
		information_collection.update_one(filter_update, new_value)
		return {'result': 'disable successfully'}
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