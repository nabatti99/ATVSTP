import pymongo
from bson import ObjectId
from models.manager import Manager
from routes import app
from flask import request, jsonify

list_database = [{'id': i+1} for i in range(100)]

@app.route('/paging/<string:type_database>', methods=['POST'])
def pagination(type_database):

    offset = int(request.args['offset'])
    limit = int(request.args['limit'])

    # database = get_current_database(type_database)
    # list_database = [Manager().db_to_dict(db) for db in database.find({})]
    obj = {}

    if offset == 1:
        obj['prev_url'] = ''
    else:
        obj['prev_url'] = f'/paging/{type_database}?offset=' + str(max(1, offset - limit)) + '&limit=' + str(offset - 1)

    if offset + limit > len(list_database):
        obj['next_url'] = ''
    else:
        obj['next_url'] = f'/paging/{type_database}?offset=' + str(offset + limit) + '&limit=' + str(limit)

    obj['result'] = list_database[offset-1:offset+limit-1]
    return jsonify(obj)


def get_current_database(type_database):
    if type_database == 'manager':
        database = app.db.manager
    elif type_database == 'grocery':
        database = app.db.grocery
    else:
        return 'Can not find any collection in database'

    return database