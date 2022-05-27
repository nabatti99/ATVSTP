from routes import app, manager_required, response_status, fail_status, success_status
from datetime import datetime
inspection_schedule = app.db.inspection_schedule
certificate_collection = app.db.certificate_atvstp
feedback_collection = app.db.feedback_of_people


@app.route('/general_situation/inspection_schedule', methods=['GET'])
# @manager_required('level_two')
def inspection_schedule_in_month(current_manager = None):
    try:
        current_month = datetime.utcnow().month
        count_inspection_schedule_in_month = inspection_schedule.count_documents({
            '$expr': {
                '$eq': [{'$month': '$schedule'}, current_month]
            }
        })
        if count_inspection_schedule_in_month:
            return response_status(status=success_status,
                                   message=count_inspection_schedule_in_month)
        else:
            return response_status(status=fail_status,
                                   message=0)
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/general_situation/certificate_atvstp')
# @manager_required('level_two')
def certificate_atvstp_in_month(current_manager = None):
    try:
        current_month = 4
        count_certificate_atvstp_in_month = certificate_collection.count_documents({
            '$expr': {
                '$eq': [{'$month': '$schedule'}, current_month]
            }
        })
        if count_certificate_atvstp_in_month:
            return response_status(status=success_status,
                                   message=count_certificate_atvstp_in_month)
        else:
            return response_status(status=fail_status,
                                   message=0)
    except Exception as e:
        return {'Type Error': e}, 400


@app.route('/general_situation/feedback_of_people')
@manager_required('level_two')
def feedback_of_people_in_month(current_manager = None):
    try:
        current_month = 4
        count_feedback_of_people_in_month = feedback_collection.count_documents({
            '$expr': {
                '$eq': [{'$month': '$schedule'}, current_month]
            }
        })
        if count_feedback_of_people_in_month:
            return response_status(status=success_status,
                                   message=count_feedback_of_people_in_month)
        else:
            return response_status(status=fail_status,
                                   message=0)
    except Exception as e:
        return {'Type Error': e}, 400