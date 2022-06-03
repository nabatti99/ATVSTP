from routes import app, manager_required
from bson import ObjectId
from flask import request
from .pagination import pagination
from models.grocery import Grocery
from models.firebase import storage
import time
from datetime import datetime

grocery_collection = app.db.grocery
certificate_collection = app.db.certificate_atvstp


@app.route('/grocery', methods=['GET'])
def get_grocery(current_manager=None):
    offset = int(request.args['offset'])
    limit = int(request.args['limit'])
    search_value = request.args['value']

    list_groceries = []
    try:
        all_groceries = grocery_collection.find({
            'name': {'$regex': str(search_value)}
        })
        if all_groceries:
            for gr in all_groceries:
                list_groceries.append(gr)
            return pagination(path_dir=f'/grocery/search',
                              offset=offset,
                              limit=limit,
                              value=search_value,
                              list_database=list_groceries)
        else:
            return {'Status': 'Fail',
                    'Message': 'Can not find any grocery in database'}, 401
    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not get data'}, 400


@app.route('/grocery/<string:grocery_name>', methods=['GET'])
def get_grocery_by_name(current_manager=None, grocery_name: str = ''):
    try:
        grocery = grocery_collection.find_one({'name': grocery_name})
        if grocery:
            return {'Status': 'Success',
                    'Grocery': grocery}
        else:
            return {'Status': 'Fail',
                    'Message': 'Not found'}, 401
    except Exception as e:
        return {'Status': 'Fail',
                'Message': f'{e}'}, 400


@app.route('/grocery', methods=['POST'])
@manager_required("level_one")
def add_grocery(current_manager=None):
    data = request.get_json()
    created_time = datetime.utcnow()
    logger = check_input(data)
    if not logger:
        new_grocery = Grocery(name=data['name'],
                              owner=data['owner'],
                              phone_number=data['phone_number'],
                              address=data['address'],
                              item=data['item'],
                              status=data['status'],
                              certificate=data['certificate'],
                              created_time=created_time)
        try:
            for certificate in data['certificate']:
                object_grocery = {'name': data['name'],
                                  'date': certificate['date']}
                certificate_collection.update_one({'name': certificate['name']},
                                                  {'$push': {
                                                      'list_groceries': object_grocery
                                                  }})

            grocery_collection.insert_one(new_grocery.to_dict())
            return {'Status': 'Success',
                    'Message': 'Add successfully'}
        except Exception as e:
            return {'Status': 'Fail',
                    'Message': f'{e}'}, 400
    else:
        return {'Status': 'Fail',
                'Message': logger}, 401


@app.route('/grocery/<string:grocery_name>', methods=['PUT'])
@manager_required("level_one")
def update_a_grocery(current_manager=None, grocery_name: str = ''):
    data = request.get_json()
    updated_grocery = {'name': data['name'],
                       'owner': data['owner'],
                       'phone_number': data['phone_number'],
                       'address': data['address'],
                       'item': data['item'],
                       'status': data['status'],
                       'certificate': data['certificate']}
    try:
        grocery_collection.find_one_and_update({'name': grocery_name},
                                               {"$set": updated_grocery})
        return {'Status': 'Success',
                'Message': 'Update successfully'}
    except Exception as e:
        print(e)
        return {'Status': 'Fail',
                'Message': 'Can not update'}, 400


@app.route('/grocery/<string:grocery_name>', methods=['DELETE'])
@manager_required("level_one")
def delete_grocery(current_manager=None, grocery_name: str = ''):
    try:
        deleted_grocery = grocery_collection.find_one({'name': grocery_name})
        if deleted_grocery:
            delete_time = datetime.utcnow()
            try:
                list_certificates = deleted_grocery['certificate']
                for certificate_object in list_certificates:
                    certificate = certificate_collection.find_one({'name': certificate_object['name']})
                    list_groceries = certificate['list_groceries']
                    for grocery in list_groceries:
                        if grocery['name'] == grocery_name:
                            list_groceries.remove(grocery)
                            break
                    certificate_collection.find_one_and_update({'name': certificate_object['name']},
                                                               {'$set': {
                                                                   'list_groceries': list_groceries
                                                               }})
            except:
                print("This grocery does not have any certificate.")
            grocery_collection.find_one_and_update({'name': grocery_name},
                                                   {'$set':
                                                        {'date_delete': delete_time}})

            return {'Status': 'Success',
                    'Message': f'Deleted grocery: {grocery_name}'}
        else:
            return {'Status': 'Fail',
                    'Message': f'Do not have grocery {grocery_name} in database'}, 401
    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not delete'}, 400


@app.route('/grocery/restore/<string:grocery_name>', methods=['PUT'])
@manager_required('level_one')
def restore_grocery(current_manager=None, grocery_name: str = ''):
    try:
        grocery = grocery_collection.find_one({'name': grocery_name})
        try:
            list_certificates = grocery['certificate']
            for certificate_object in list_certificates:
                grocery_object = {'name': grocery_name,
                                  'date': certificate_object['date']}
                certificate_collection.update_one({'name': certificate_object['name']},
                                                  {'$push': {
                                                      'list_groceries': grocery_object
                                                  }})
        except:
            print("This grocery does not have any certificate.")
        restored_grocery = grocery_collection.update_one({'name': grocery_name},
                                                         {"$unset": {'date_delete': 1}})
        if restored_grocery:
            return {'Status': 'Success',
                    'Message': f'Restored grocery: {grocery_name}'}
        else:
            return {'Status': 'Fail',
                    'Message': 'Can not find this grocery in database'}, 401
    except Exception as e:
        return {'Type Error': f'{e}'}, 400


@app.route('/grocery/save_image/<string:name>', methods=['POST'])
@manager_required('level_one')
def load_image_grocery(current_manager=None, name: str = ''):
    try:
        upload = request.files['upload']
        grocery = grocery_collection.find_one({'name': name})
        if grocery:
            save_dir = f'grocery/{grocery["_id"]}.jpg'
            storage.child(save_dir).put(upload)
            grocery_collection.find_one_and_update({'name': name},
                                                   {"$set": {
                                                       "image_url": storage.child(save_dir).get_url(None)
                                                   }})
            return {'Status': 'Success',
                    'Message': f"Upload image successfully: {grocery['image_url']}"}
        else:
            return {'Status': 'Fail',
                    'Message': 'Can not find this grocery in database'}, 401

    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not restore'}, 400


@app.route('/grocery/count', methods=['GET'])
# @manager_required('level_one')
def count_groceries(current_manager=None):
    month_now = datetime.utcnow().month
    year_now = datetime.utcnow().year
    month_min = 1
    if month_now < 12:
        month_min = month_now + 1

    list_date = []
    list_number_of_groceries = []
    list_number_of_groceries_have_cer = []
    list_number_of_groceries_not_have_cer = []
    for i in range(12):
        list_number_of_groceries.append(0)
        list_number_of_groceries_have_cer.append(0)
        list_number_of_groceries_not_have_cer.append(0)
    index = 0
    try:
        if month_min != 1:
            for month in range(month_min, 13):
                month_year = format_month(month) + '/' + str(year_now - 1)
                list_date.append(month_year)
                list_groceries = get_groceries_by_time(month, year_now - 1)
                list_number_of_groceries[index] = len(list_groceries)
                for grocery in list_groceries:
                    if len(grocery['certificate']) > 0:
                        list_number_of_groceries_have_cer[index] += 1
                    else:
                        list_number_of_groceries_not_have_cer[index] += 1
                index += 1
        for month in range(1, month_now + 1):
            month_year = format_month(month) + '/' + str(year_now)
            list_date.append(month_year)
            list_groceries = get_groceries_by_time(month, year_now)
            list_number_of_groceries[index] = len(list_groceries)
            for grocery in list_groceries:
                if len(grocery['certificate']) > 0:
                    list_number_of_groceries_have_cer[index] += 1
                else:
                    list_number_of_groceries_not_have_cer[index] += 1
            index += 1

        return {'Status': 'Success',
                'Result': {
                    "Time": list_date,
                    "General": list_number_of_groceries,
                    "Have_cer": list_number_of_groceries_have_cer,
                    "Not_have_cer": list_number_of_groceries_not_have_cer
                }}

    except Exception as e:
        print(e)
        return {'Status': 'Fail',
                'Message': 'Have some error'}


def check_input(new_grocery):
    logger = {}
    try:
        new_grocery['name']
    except:
        logger['name'] = 'No name'
    try:
        new_grocery['owner']
    except:
        logger['owner'] = 'No owner'
    try:
        new_grocery['phone_number']
    except:
        logger['phone_number'] = 'No phone number'
    try:
        new_grocery['address']
    except:
        logger['address'] = 'No address'
    try:
        new_grocery['status']
    except:
        logger['status'] = 'No status'
    try:
        new_grocery['item']
    except:
        logger['item'] = 'No item'
    try:
        new_grocery['certificate']
    except:
        logger['certificate'] = 'No certificate'
    return logger


def format_month(number):
    if number < 10:
        return '0' + str(number)
    else:
        return str(number)


def get_groceries_by_time(month, year):
    date_min = datetime(year, month, 1)
    if month < 12:
        date_max = datetime(year, month + 1, 1)
    else:
        date_max = datetime(year + 1, 1, 1)
    print(date_min)
    print(date_max)

    list_groceries = list(grocery_collection.find({"created_time": {"$gte": date_min, "$lt": date_max}}))
    print(list_groceries)
    print()
    return list_groceries
