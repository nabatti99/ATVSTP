import pyrebase
import os
from dotenv import load_dotenv
load_dotenv()

config = {
    'apiKey': os.getenv('apiKey'),
    'authDomain': "atvstp-2c0ed.firebaseapp.com",
    'projectId': "atvstp-2c0ed",
    'storageBucket': "atvstp-2c0ed.appspot.com",
    'messagingSenderId': "866557137316",
    'appId': os.getenv('appId'),
    'measurementId': "G-92RME3SDDR",
    'databaseURL': 'gs://atvstp-2c0ed.appspot.com'
}

firebase = pyrebase.initialize_app(config=config)

storage = firebase.storage()


# storage.child("grocery/Screenshot_20211024-200733.jpg").put("Screenshot_20211024-200733.jpg")
# print(storage.child("grocery/Screenshot_20211024-200733.jpg").get_url(None))

