from flask import Flask
from flask_mail import Mail, Message
from flask_cors import CORS
import os
from service import conn
from models.encoder import Encoder
from dotenv import load_dotenv

load_dotenv()
# -------------Mongodb-------------
app = Flask(__name__)
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
CORS(app)


from routes.management_user import manager_required
from routes import management_email, management_user, pagination, groceryApis, certificateApis