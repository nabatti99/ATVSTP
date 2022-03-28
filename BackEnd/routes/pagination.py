def pagination(path_dir, offset, limit, list_database):
    obj = {}
    if offset == 1:
        obj['prev_url'] = ''
    else:
        obj['prev_url'] = f'{path_dir}?offset=' + str(max(1, offset - limit)) + '&limit=' + str(offset - 1)

    if offset + limit > len(list_database):
        obj['next_url'] = ''
    else:
        obj['next_url'] = f'/{path_dir}?offset=' + str(offset + limit) + '&limit=' + str(limit)

    obj['result'] = list_database[offset - 1:offset + limit - 1]
    return obj
