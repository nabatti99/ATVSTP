from routes import app, manager_required
from bson import ObjectId
from flask import request
from .pagination import pagination
from models.grocery import Grocery
from models.firebase import storage

grocery_collection = app.db.grocery


@app.route('/grocery', methods=['GET'])
@manager_required("level_one")
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
@manager_required("level_one")
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
    new_grocery = Grocery(name=data['name'],
                          owner=data['owner'],
                          phone_number=data['phone_number'],
                          address=data['address'],
                          item=data['item'],
                          status=data['status'],
                          certificate=data['certificate'])
    try:
        grocery_collection.insert_one(new_grocery.to_dict())
        return {'Status': 'Success',
                'Message': 'Add successfully'}
    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not insert data'}, 400


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
        deleted_grocery = grocery_collection.find_one_and_delete({'name': grocery_name})
        if deleted_grocery:
            return {'Status': 'Success',
                    'Message': f'Deleted {grocery_name}'}
        else:
            return {'Status': 'Fail',
                    'Message': f'Do not have grocery {grocery_name} in database'}, 401
    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not delete'}, 400


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
                'Message': e}, 400


