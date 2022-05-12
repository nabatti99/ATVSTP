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
                 image_url: str = "",
                 role: str = ''):

        self.__name = name
        self.__hash_password = hash_password
        self.__address = address
        self.__email = email
        self.__phone = phone
        self.__type_manager = type_manager
        self.__work_from = work_from
        self.__image_url = image_url
        self.__role = role

    def to_dict(self):
        return {
            'name': self.__name,
            'hash_password': self.__hash_password,
            'email': self.__email,
            'phone': self.__phone,
            'address': self.__address,
            'type_manager': self.__type_manager,
            'work_from': self.__work_from,
            'image_url': self.__image_url,
            'role': self.__role
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
            'image_url': database['image_url'],
            'role': database['role'],
            'date_delete': database.get('data_delete', None)
        }
