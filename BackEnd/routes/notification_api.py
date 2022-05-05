from routes import app, manager_required, Message, mail
from flask import request
from models.notification import Notification
from bson import ObjectId
from .pagination import pagination


notification_collection = app.db.notification_for_inspector;


@app.route('/notification/<string:id>', methods=['GET'])
@manager_required('level_one')
def get_notification_by_id(current_manager=None, id: str = ''):
    try:
        current_notification = notification_collection.find_one({'_id': ObjectId(id)})
        if current_notification:
            return current_notification
        else:
            return {'Status': 'Fail',
                    'Message': 'Can not find any notification in database'}, 401
    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Error'}, 400


@app.route('/notification', methods=['GET'])
@manager_required('level_one')
def get_notification(current_manager=None):
    offset = int(request.args['offset'])
    limit = int(request.args['limit'])

    list_notifications = []
    try:
        all_notifications = notification_collection.find({})
        if all_notifications:
            for notification in all_notifications:
                list_notifications.append(notification)
            return pagination(path_dir=f'/notification',
                              offset=offset,
                              limit=limit,
                              list_database=list_notifications)
        else:
            return {'Status': 'Fail',
                    'Message': 'Do not have any notification in database'}, 401
    except Exception as e:
        return {'Status': 'Fail',
                'Message': 'Can not get data'}, 400


@app.route('/notification', methods=['POST'])
@manager_required('level_one')
def create_an_notification(current_manager=None):
    data = request.get_json()
    logger = check_input(data)
    if not logger:
        notification = Notification(sender=current_manager,
                                    title=data['title'],
                                    content=data['content'],
                                    receiver=data['receiver'])
        try:
            notification_collection.insert_one(notification)
            send_email_notification(notification)
            return {'Status': 'Success',
                    'Message': 'Add successfully'}
        except:
            return {'Status': 'Fail',
                    'Message': 'Can not insert data'}, 400
    else:
        return {'Status': 'Fail',
                'Message': logger}, 401

def check_input(new_notification):
    logger = {}
    try:
        new_notification['title']
    except:
        logger['title'] = 'No title'

    try:
        new_notification['content']
    except:
        logger['content'] = 'No content'

    try:
        new_notification['receiver']
    except:
        logger['receiver'] = 'No receiver'

def send_email_notification(notification):
    msg = Message(notification['title'],
                  recipients=notification['receiver'])
    msg.body = notification['content']
    mail.send(msg)


