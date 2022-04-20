from flask import request, jsonify
from routes import app
from bson.objectid import ObjectId
import flask
import time

from models.feedback_of_people import FeedbackOfPeople as fop

feedback_collection = app.db.feedback_of_people
administration_collection = app.db.administration_atvstp

total_row_per_page = 10 # so du lieu trong 1 trang: default
fail_status = 'Fail'
success_status = 'Success'

@app.route('/feedback/read', methods=['GET'])
def feedback_read():
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
    total_row = feedback_collection.count_documents({})
    offset = getOffset(int(current_page), int(row_limit))
    total_page = getTotalPage(total_row, int(row_limit))
    data = feedback_collection.find().skip(offset).limit(int(row_limit))
    # check xem co tim kiem khong
    search_value = data_from_client.get('value')
    if search_value is not None:
        total_row = feedback_collection.count_documents({
            "$or": [
                {"fullname": {'$regex':search_value, '$options' : 'i'}},
                {"email": {'$in':[search_value]}},
                {"content": {'$regex':search_value, '$options' : 'i'}}
            ]
        })
        offset = getOffset(int(current_page), int(row_limit))
        total_page = getTotalPage(total_row, int(row_limit))
        data = feedback_collection.find({
            "$or": [
                {"fullname": {'$regex':search_value, '$options' : 'i'}},
                {"email": {'$in':[search_value]}},
                {"content": {'$regex':search_value, '$options' : 'i'}}
            ]
        }).skip(offset).limit(int(row_limit))
    list_data = list(data)
    if len(list_data) == 0:
        return {'result': 'no data'}
    result = {"data": list_data, "records": total_row}
    return result


@app.route('/feedback/read/<oid>', methods=['GET'])
def feedback_read_by_id(oid):
    try:
        feedback = feedback_collection.find_one({"_id": ObjectId(oid)})
        if feedback is not None:
            return jsonify(feedback)
        else:
            return response_status(fail_status, f'Can not find feedback with id {oid} in database'), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/feedback/create', methods=['POST'])
def feedback_create():
    data = request.get_json()
    # validate data
    administration = administration_collection.find_one({"_id": ObjectId(data['department'])})
    if administration is None:
        return response_status(fail_status, "Data error")
    if data['fullname'] == '' or data['email'] == '' or data['phone_number'] == '' or data['content'] == '':
        return response_status(fail_status, "Data error")
    current_time = time.strftime("%d-%m-%Y %H:%M:%S", time.localtime())
    new_feedback = fop(fullname=data['fullname'],
    					  email=data['email'],
                          phone_number=data['phone_number'],
                          department=ObjectId(data['department']),
                          content=data['content'],
                          create_at=current_time)
    try:
        feedback_collection.insert_one(new_feedback.to_dict())
        return response_status(success_status, new_feedback.to_dict())
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/feedback/update', methods=['PUT'])
def feedback_update():
    data = request.get_json()
    # validate data
    administration = administration_collection.find_one({"_id": ObjectId(data['department'])})
    if administration is None:
        return response_status(fail_status, "Data error")
    if data['fullname'] == '' or data['email'] == '' or data['phone_number'] == '' or data['content'] == '':
        return response_status(fail_status, "Data error")
    item_update = feedback_collection.find_one({"_id": ObjectId(data['_id'])}) # object will be updated
    if item_update is None:
        return response_status(fail_status, "Data not exist")
    new_feedback = fop(fullname=data['fullname'],
    					  email=data['email'],
                          phone_number=data['phone_number'],
                          department=ObjectId(data['department']),
                          content=data['content'],
                          create_at=item_update['create_at'])
    filter_update = {'_id': item_update['_id']}
    new_value = {"$set": new_feedback.to_dict()}
    try:
        feedback_collection.update_one(filter_update, new_value)
        return response_status(success_status, new_feedback.to_dict())
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/feedback/delete', methods=['DELETE'])
def feedback_delete():
    data = request.args
    oid = data.get('_id')
    if oid is None:
        return response_status(fail_status, "Data not exist")
    item_update = feedback_collection.find_one({"_id": ObjectId(oid)}) # object will be deleted
    if item_update is None:
        return response_status(fail_status, "Data not exist")
    try:
        feedback_collection.delete_one({"_id": item_update['_id']})
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