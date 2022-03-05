from pymongo import MongoClient

my_server = "mongodb+srv://ATVSTP:atvstp@atvstp-project.xoj9q.mongodb.net/test"


def connect_server():
    client = MongoClient(my_server)
    return client


conn = connect_server()
