from flask import jsonify


def pagination(path_dir: str = "",
               offset: int = 0,
               limit: int = 10,
               value: str = "",
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
    obj['records'] = len(list_database)
    return jsonify(obj)


def pagination_inspection_schedule(path_dir: str = "",
                                   offset: int = 0,
                                   limit: int = 10,
                                   date_start: str = "",
                                   date_end: str = '',
                                   list_database: list = None):
    obj = {}
    if offset == 0:
        obj['prev_url'] = ''
    else:
        obj['prev_url'] = f'/{path_dir}?offset=' + str(max(0, offset - limit)) + \
                          '&limit=' + str(offset - 1) + "&date_start=" + date_start + "&date_end=" + date_end

    if offset + limit >= len(list_database):
        obj['next_url'] = ''
    else:
        obj['next_url'] = f'/{path_dir}?offset=' + str(offset + limit) + \
                          '&limit=' + str(limit) + "&date_start=" + date_start + "&date_end=" + date_end

    obj['result'] = list_database[offset:offset + limit]
    obj['records'] = len(list_database)
    return jsonify(obj)
