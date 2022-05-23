from routes import app, manager_required
from bson import ObjectId
from flask import request
from .pagination import pagination
from models.grocery import Grocery
from models.firebase import storage
import time
from datetime import datetime
import pytz
import tzlocal

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
@manager_required('level_one')
def count_groceries(current_manager=None):
    try:
        list_groceries = grocery_collection.find({})
        dict_count_groceries_general = {}
        dict_count_groceries_have_cer = {}
        dict_count_groceries_not_have_cer = {}
        for grocery in list_groceries:
            list_certificates = grocery['certificate']
            try:
                local_timezone = tzlocal.get_localzone()
                created_time_local = grocery['created_time'].replace(tzinfo=pytz.utc).astimezone(local_timezone)
                key_month = str(created_time_local.month) + '/' + str(created_time_local.year)

                value_in_month = dict_count_groceries_general.get(key_month, None)
                if value_in_month is None:
                    dict_count_groceries_general[key_month] = 1
                else:
                    dict_count_groceries_general[key_month] = value_in_month + 1

                value_in_month = dict_count_groceries_have_cer.get(key_month, None)
                if len(list_certificates) > 0:
                    if value_in_month is None :
                        dict_count_groceries_have_cer[key_month] = 1
                    else:
                        dict_count_groceries_have_cer[key_month] = value_in_month + 1

                value_in_month = dict_count_groceries_not_have_cer.get(key_month, None)
                if len(list_certificates) == 0:
                    if value_in_month is None:
                        dict_count_groceries_not_have_cer[key_month] = 1
                    else:
                        dict_count_groceries_not_have_cer[key_month] = value_in_month + 1
            except Exception as e:
                print(e)

        return {'Status': 'Success',
                'Result': {
                    'General': dict_count_groceries_general,
                    'Have_cer': dict_count_groceries_have_cer,
                    'Not_have_cer': dict_count_groceries_not_have_cer
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
