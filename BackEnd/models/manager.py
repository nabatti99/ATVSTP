from typing import Dict, overload


class Manager:
    def __init__(self,
                 name: str = 'manager',
                 hash_password: str = '123456',
                 email: str = 'manager@gmail.com',
                 address:  dict = None,
                 phone: str = '',
                 type_manager: str = 'admin',
                 work_from: str = '',
                 image_url: str = ""):

        self.name = name
        self.hash_password = hash_password
        self.address = address
        self.email = email
        self.phone = phone
        self.type_manager = type_manager
        self.work_from = work_from
        self.image_url = image_url

    def to_dict(self):
        return {
            'name': self.name,
            'hash_password': self.hash_password,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'type_manager': self.type_manager,
            'work_from': self.work_from,
            'image_url': self.image_url
        }

    def db_to_dict(self, database):
        return {
            '_id': database['_id'],
            'name': database['name'],
            'email': database['email'],
            'phone': database['phone'],
            'address': database['address'],
            'type_manager': database['type_manager'],
            'work_from': database['work_from'],
            'image_url': database['image_url']
        }
