from bson import ObjectId
from datetime import datetime
from routes import app, manager_required, response_status, fail_status, success_status
from models.superior_reporting import SuperiorReporting
from flask import request
from routes.pagination import pagination_schedule
from routes.management_email import send_email_for_schedule

superior_reporting = app.db.superior_reporting


@app.route('/superior_reporting/<string:_id>', methods=['GET'])
@manager_required('level_one')
def get_superior_reporting_by_id(current_manager=None, _id: str = ''):
    try:
        current_superior_reporting = superior_reporting.find_one({'_id': ObjectId(_id)})
        if current_superior_reporting:
            return current_superior_reporting
        else:
            return response_status(status=fail_status,
                                   message=f'Can not find any inspection planing have if {_id} in database'), \
                   401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/superior_reporting', methods=['GET'])
@manager_required('level_one')
def get_superior_reporting(current_manager=None):
    try:
        date_start = request.args['date_start']
        date_end = request.args['date_end']
        offset = int(request.args['offset'])
        limit = int(request.args['limit'])
        is_draft = bool(int(request.args['is_draft']))

        some_superior_reporting = superior_reporting.find({
            "updated_at": {
                "$gte": datetime.strptime(date_start, '%Y-%m-%d'),
                "$lte": datetime.strptime(date_end, '%Y-%m-%d'),
            },
            'is_draft': is_draft,
        })

        lst_superior_reporting = []
        if some_superior_reporting:
            for report in some_superior_reporting:
                lst_superior_reporting.append(report)
            return pagination_schedule(path_dir='superior_reporting',
                                       offset=offset,
                                       limit=limit,
                                       date_start=date_start,
                                       date_end=date_end,
                                       is_draft=is_draft,
                                       list_database=lst_superior_reporting)
        else:
            return response_status(status=fail_status,
                                   message='Can not find any report in database'), 401

    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/superior_reporting', methods=['POST'])
@manager_required('level_one')
def create_superior_reporting(current_manager=None):
    db = request.get_json()
    try:
        loggers = check_superior_reporting(db)

        if loggers:
            return response_status(status=fail_status, message=loggers), 401
        else:
            updated_at = datetime.strptime(current_time(), '%Y-%m-%d')

            new_report = SuperiorReporting(title=db['title'],
                                           writer=current_manager['email'],
                                           reporting_area=db['reporting_area'],
                                           inspected_groceries=db['inspected_groceries'],
                                           content=db['content'],
                                           regulator_agency=db['regulator_agency'],
                                           updated_at=updated_at,
                                           is_draft=db['is_draft'])

            superior_reporting.insert_one(new_report.to_dict())
            # if not db['is_draft']:
            #     send_email_for_schedule(new_schedule=new_report.to_dict(),
            #                             current_manager=current_manager['email'])

            return response_status(status=success_status,
                                   message=new_report.to_dict())
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/superior_reporting/<string:_id>', methods=['PUT'])
@manager_required('level_one')
def update_superior_reporting(current_manager=None, _id: str = ''):
    try:
        db = request.get_json()
        loggers = check_superior_reporting(db)
        if loggers:
            return response_status(status=fail_status, message=loggers), 401
        else:
            updated_at = datetime.strptime(current_time(), '%Y-%m-%d')

            current_report = SuperiorReporting(title=db['title'],
                                               writer=current_manager['email'],
                                               reporting_area=db['reporting_area'],
                                               inspected_groceries=db['inspected_groceries'],
                                               content=db['content'],
                                               regulator_agency=db['regulator_agency'],
                                               updated_at=updated_at,
                                               is_draft=db['is_draft'])

            updated = superior_reporting.update_one({'_id': ObjectId(_id)},
                                                    {
                                                        '$set': current_report.to_dict()
                                                    })
            if updated:
                if not db['is_draft']:
                    send_email_for_schedule(new_schedule=current_report.to_dict(),
                                            current_manager=current_manager['email'])
                return response_status(status=success_status,
                                       message=f'Updated inspection schedule {_id}')
            else:
                return response_status(status=fail_status,
                                       message=f'Do not find inspection schedule : {_id} '
                                               f'in database, please check again!'), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/superior_reporting/<string:_id>', methods=['DELETE'])
@manager_required('level_one')
def delete_superior_reporting(current_manager=None, _id: str = ''):
    try:
        # deleted_superior_reporting = superior_reporting.delete_one({'_id': ObjectId(_id)})
        deleted_superior_reporting = superior_reporting.update_one({'_id': ObjectId(_id)},
                                                                   {'$set': {
                                                                       'date_delete': datetime.utcnow()
                                                                   }})
        if deleted_superior_reporting:
            return response_status(status=success_status,
                                   message=f'Deleted report {_id}')
        else:
            return response_status(status=fail_status,
                                   message=f'Do not have report {_id} in database'), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/superior_reporting/restore_report/<string:_id>', methods=['PUT'])
@manager_required("level_two")
def restore_superior_reporting(current_manager=None, _id: str = ''):
    try:

        restored_superior_reporting = superior_reporting.update_one({'_id': ObjectId(_id)},
                                                                    {"$unset": {'date_delete': 1}})

        if restored_superior_reporting:
            return response_status(status=success_status,
                                   message=f'Restored report {_id}')
        else:
            return response_status(status=fail_status,
                                   message=f'Do not have report {_id} in database'), 401
    except Exception as e:
        return {'Type Error': e}, 400


def check_superior_reporting(db):
    loggers = {}
    try:
        db['title']
    except:
        loggers['title'] = 'No title'

    try:
        db['reporting_area']
    except:
        loggers['reporting_area'] = 'No reporting_area'

    try:
        db['inspected_groceries']
    except:
        loggers['inspected_groceries'] = 'No inspected_groceries'

    try:
        db['content']
    except:
        loggers['content'] = 'No content'

    try:
        db['regulator_agency']
    except:
        loggers['regulator_agency'] = 'No regulator_agency'

    try:
        db['is_draft']
    except:
        loggers['is_draft'] = 'No is_draft'

    return loggers


def current_time():
    return datetime.now().strftime("%Y-%m-%d")
