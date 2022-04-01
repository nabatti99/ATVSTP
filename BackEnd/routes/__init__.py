from flask import Flask
from flask_mail import Mail, Message
import os
from service import conn
from models.encoder import Encoder

# -------------Mongodb-------------
app = Flask(__name__, template_folder='templates')
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['DEBUG'] = True

# -------------Email-------------
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'phamtu682061@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = 'phamtu682061@gmail.com'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['SECURITY_PASSWORD_SALT'] = os.getenv("SECURITY_PASSWORD_SALT")

# -------------------Route-------------
app.json_encoder = Encoder
app.db = conn.atvstp
mail = Mail(app)


from routes.management_user import manager_required
from routes import management_email, management_user, pagination, groceryApis, administration_atvstp_routes, feedback_of_people_routes, information_atvstp_routes