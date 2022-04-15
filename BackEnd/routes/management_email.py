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


def send_email_managers_for_new_inspection_schedule(ins_sche, current_manager):
    print(ins_sche)
    subject = f'Tôi là {current_manager} đã lên lịch cho đơn vị {ins_sche["authority"]} thực hiện thanh tra'

    msg = Message(subject, recipients=ins_sche["assigned_to"])
    msg.body = ins_sche['content']
    mail.send(msg)
