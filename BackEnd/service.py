from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def connect_server():
    client = MongoClient(os.environ.get('MONGODB_URI'))
    return client


conn = connect_server()
