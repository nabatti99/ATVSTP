from flask import jsonify


def pagination(path_dir: str = "",
               offset: int = 0,
               limit: int = 10,
               value: str = "",
               records: int = 0,
               list_database: list = None):
    obj = {}
    if offset == 0:
        obj['prev_url'] = ''
    else:
        if value:
            obj['prev_url'] = f'/{path_dir}?offset=' + str(max(0, offset - limit)) + '&limit=' + str(offset - 1) + "&value=" + value
        else:
            obj['prev_url'] = f'/{path_dir}?offset=' + str(max(0, offset - limit)) + '&limit=' + str(offset - 1)

    if offset + limit >= len(list_database):
        obj['next_url'] = ''
    else:
        if value:
            obj['next_url'] = f'/{path_dir}?offset=' + str(offset + limit) + '&limit=' + str(limit) + "&value=" + value
        else:
            obj['next_url'] = f'/{path_dir}?offset=' + str(offset + limit) + '&limit=' + str(limit)

    obj['result'] = list_database[offset:offset + limit]
    obj['records'] = records
    return jsonify(obj)
