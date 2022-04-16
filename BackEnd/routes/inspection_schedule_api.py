from bson import ObjectId
from datetime import datetime
from routes import app, manager_required, response_status, fail_status, success_status
from models.inspection_schedule import InspectionSchedule
from flask import request
from routes.pagination import pagination_schedule
from routes.management_email import send_email_for_schedule

inspection_schedule = app.db.inspection_schedule


@app.route('/inspection_schedule/<string:_id>', methods=['GET'])
# @manager_required('level_two')
def get_inspection_schedule_by_id(current_manager=None, _id: str = ''):
    try:
        current_inspection_schedule = inspection_schedule.find_one({'_id': ObjectId(_id)})
        if current_inspection_schedule:
            return current_inspection_schedule
        else:
            return response_status(status=fail_status,
                                   message=f'Can not find any inspection planing have if {_id} in database'), \
                   401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/inspection_schedule', methods=['POST'])
@manager_required('level_two')
def create_an_inspection_schedule(current_manager=None):
    db = request.get_json()
    try:
        loggers = check_inspection_schedule(db)
        if loggers:
            return response_status(status=fail_status, message=loggers), 401
        else:
            updated_by = f'{current_time()} by {current_manager["email"]}'
            schedule = datetime.strptime(db['schedule'], '%d-%m-%Y')
            new_inspection_schedule = InspectionSchedule(authority=db['authority'],
                                                         schedule=schedule,
                                                         groceries=db['groceries'],
                                                         updated_by=updated_by,
                                                         assigned_to=db['assigned_to'],
                                                         content=db['content'],
                                                         is_draft=db['is_draft'])

            inspection_schedule.insert_one(new_inspection_schedule.to_dict())
            # if not db['is_draft']:
            #     send_email_for_schedule(new_schedule=new_inspection_schedule.to_dict(),
            #                             current_manager=current_manager['email'])
            return response_status(status=success_status,
                                   message=new_inspection_schedule.to_dict())
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/inspection_schedule', methods=['GET'])
# @manager_required('level_two')
def get_inspection_schedule(current_manager=None):
    try:
        date_start = request.args['date_start']
        date_end = request.args['date_end']
        offset = int(request.args['offset'])
        limit = int(request.args['limit'])
        is_draft = bool(request.args['is_draft'])
        some_inspection_schedule = inspection_schedule.find({
            "schedule": {
                "$gte": datetime.strptime(date_start, '%d-%m-%Y'),
                "$lte": datetime.strptime(date_end, '%d-%m-%Y'),
            },
            # 'is_draft': is_draft
        })

        lst_inspection_schedule = []
        if some_inspection_schedule:
            for ins_schedule in some_inspection_schedule:
                lst_inspection_schedule.append(ins_schedule)

            return pagination_schedule(path_dir='inspection_schedule/search',
                                       offset=offset,
                                       limit=limit,
                                       date_start=date_start,
                                       date_end=date_end,
                                       is_draft=is_draft,
                                       list_database=lst_inspection_schedule)
        else:
            return response_status(status=fail_status,
                                   message='Can not find any manager in database'), 401

    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/inspection_schedule/<string:_id>', methods=['PUT'])
@manager_required('level_two')
def update_inspection_schedule(current_manager=None, _id: str = ''):
    try:
        db = request.get_json()
        loggers = check_inspection_schedule(db)
        if loggers:
            return response_status(status=fail_status, message=loggers), 401
        else:
            updated_by = f'{current_time()} by {current_manager["email"]}'

            current_inspection_schedule = InspectionSchedule(authority=db['authority'],
                                                             schedule=db['schedule'],
                                                             groceries=db['groceries'],
                                                             updated_by=updated_by,
                                                             assigned_to=db['assigned_to'],
                                                             content=db['content'],
                                                             is_draft=db['is_draft'])

            updated_ins_sche = inspection_schedule.update_one({'_id': ObjectId(_id)},
                                                              {
                                                                  '$set': current_inspection_schedule.to_dict()
                                                              })
            if updated_ins_sche:
                # if not db['is_draft']:
                #     send_email_for_schedule(new_schedule=current_inspection_schedule.to_dict(),
                #                             current_manager=current_manager['email'])
                return response_status(status=success_status,
                                       message=f'Updated inspection schedule {_id}')
            else:
                return response_status(status=fail_status,
                                       message=f'Do not find inspection schedule : {_id} '
                                               f'in database, please check again!'), 401
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/inspection_schedule/<string:_id>', methods=['DELETE'])
# @manager_required('level_two')
def delete_inspection_schedule(current_manager=None, _id: str = ''):
    try:
        deleted_inspection_schedule = inspection_schedule.delete_one({'_id': ObjectId(_id)})
        if deleted_inspection_schedule:
            return response_status(status=success_status,
                                   message=f'Deleted inspection schedule {_id}')
        else:
            return response_status(status=fail_status,
                                   message=f'Do not have inspection schedule {_id} in database'), 401
    except Exception as e:
        return {'Type Error': e}, 400


def check_inspection_schedule(db):
    loggers = {}
    try:
        db['authority']
    except:
        loggers['authority'] = 'No authority'

    try:
        db['groceries']
    except:
        loggers['groceries'] = 'No groceries'

    try:
        db['content']
    except:
        loggers['content'] = 'No content'

    try:
        db['schedule']
    except:
        loggers['schedule'] = 'No schedule'

    try:
        db['assigned_to']
    except:
        loggers['assigned_to'] = 'No one assigned to'
    return loggers


def current_time():
    return datetime.now().strftime("%H:%M:%S %d-%m-%Y")
