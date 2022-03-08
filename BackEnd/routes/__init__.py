from flask import Flask
from service import conn
import os
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.db = conn.atvstp

from routes import management
