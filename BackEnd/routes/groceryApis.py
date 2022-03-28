from routes import app, manager_required
from bson import ObjectId
from flask import request
from models.grocery import Grocery
import pymongo

grocery_collection = app.db.grocery


@app.route('/grocery', methods=['GET'])
@manager_required("level_one")
def get_grocery(current_manager=None):
    try:
        list_of_grocery = grocery_collection.find({})
        groceries = []

        for gr in list_of_grocery:
            groceries.append(gr)

        return {'Result': 'Success',
                'List_of_groceries': groceries}

    except Exception as e:
        return {'Result': 'Fail',
                'Message': 'Can not get data'}


@app.route('/grocery/<string:grocery_id>', methods=['GET'])
@manager_required("level_one")
def get_grocery_by_id(current_manager=None, grocery_id: str = ''):
    try:
        grocery = grocery_collection.find_one({'_id': ObjectId(grocery_id)})
        if grocery:
            return {'Result': 'Success',
                    'Grocery': grocery}
        else:
            return {'Result': 'Fail',
                    'Message': 'Not found'}
    except Exception as e:
        return {'Result': 'Fail',
                'Message': 'Can not get data'}


@app.route('/grocery', methods=['POST'])
@manager_required("level_one")
def add_grocery(current_manager=None):
    data = request.get_json()
    new_grocery = Grocery(name=data['name'],
                          owner=data['owner'],
                          phone_number=data['phone_number'],
                          address=data['address'],
                          item=data['item'],
                          status=data['status'],
                          certificate=data['certificate'])
    try:
        grocery_collection.insert_one(new_grocery.to_dict())
        return {'Result': 'Success',
                'Message': 'Add successfully'}
    except Exception as e:
        return {'Result': 'Fail',
                'Message': 'Can not insert data'}


@app.route('/grocery/<string:grocery_id>', methods=['PUT'])
@manager_required("level_one")
def update_a_grocery(current_manager=None, grocery_id: str = ''):
    data = request.get_json()
    updated_grocery = {'name': data['name'],
                       'owner': data['owner'],
                       'phone_number': data['phone_number'],
                       'address': data['address'],
                       'item': data['item'],
                       'status': data['status'],
                       'certificate': data['certificate']}
    try:
        grocery_collection.find_one_and_update({'_id': ObjectId(grocery_id)},
                                               {"$set": updated_grocery})
        return {'Result': 'Success',
                'Message': 'Update successfully'}
    except Exception as e:
        print(e)
        return {'Result': 'Fail',
                'Message': 'Can not update'}


@app.route('/grocery/<string:grocery_id>', methods=['DELETE'])
@manager_required("level_one")
def delete_grocery(current_manager=None, grocery_id: str = ''):
    try:
        deleted_grocery = grocery_collection.find_one_and_delete({'_id': ObjectId(grocery_id)})
        if deleted_grocery:
            return {'Result': 'Success',
                    'Message': f'Deleted {grocery_id}'}
        else:
            return {'Result': 'Fail',
                    'Message': f'Do not have grocery {grocery_id} in database'}
    except Exception as e:
        return {'Result': 'Fail',
                'Message': 'Can not delete'}
