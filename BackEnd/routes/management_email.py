from routes import app, Message, mail
import random
from itsdangerous import URLSafeTimedSerializer


def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])


def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email


def send_email_new_password(the_manager, new_password):
    subject = f'Mật khẩu mới trang của user: {the_manager["name"]} tại website ATVSTP'

    content = f'''
        Bạn nhận được mail này vì bạn có mật khẩu mới với vai trò là {the_manager['type_manager']}.
        Mật khẩu mới được thay đổi phía bên dưới

        New password:\t{new_password}

        Cảm ơn bạn đã sử dụng website của chúng tôi     
    '''

    msg = Message(subject, recipients=[the_manager['email']])
    msg.body = content
    mail.send(msg)


def gen_password():
    numbers = '0 1 2 3 4 5 6 7 8 9'
    characters = 'a b c d e f g h i j k l m n o p q r s t u v  w x y z'
    special_characters = '! @ # % ^ & * - +'

    password = random.choices(numbers.split(), k=random.randint(3, 7)) + \
               random.choices(characters.split(), k=random.randint(3, 7)) + \
               random.choices(special_characters.split(), k=random.randint(3, 7))
    random.shuffle(password)
    return ''.join(password)


def send_email_for_schedule(new_schedule, current_manager, assigned_to):
    subject = f'Tôi là {current_manager} đã lên lịch cho đơn vị {new_schedule["regulator_agency"]} thực hiện thanh tra'

    msg = Message(subject, recipients=assigned_to)
    msg.body = new_schedule['content']
    mail.send(msg)


def send_email_feed_back(email_customer, name_customer, department, content, feedback):

    subject = f'Phản hồi đến người dân {name_customer} từ {department}'

    msg = Message(subject, recipients=[email_customer])
    msg.body = f'''Sau khi nhận được phản hồi của ngừoi dân với nội dung như sau: \n
                
                {feedback} \n
                
                Chúng tôi xin phản hồi lại như sau: \n
                
                {content} \n
                
                Chúng tôi xin chân thành cảm ơn những ý kiến góp ý của bạn!!!!
                '''
    mail.send(msg)