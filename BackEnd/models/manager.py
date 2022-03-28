class Manager:
    def __init__(self,
                 name: str = 'manager',
                 hash_password: str = '123456',
                 email: str = 'manager@gmail.com',
                 address:  dict = None,
                 phone: str = '',
                 type_manager: str = 'admin',
                 position: str = ''):

        self.name = name
        self.hash_password = hash_password
        self.address = address
        self.email = email
        self.phone = phone
        self.type_manager = type_manager
        self.position = position

    def to_dict(self):
        return {
            'name': self.name,
            'hash_password': self.hash_password,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'type_manager': self.type_manager,
            'position': self.position
        }

    def db_to_dict(self, database):
        return {
            '_id': database['_id'],
            'name': database['name'],
            'email': database['email'],
            'phone': database['phone'],
            'address': database['address'],
            'type_manager': database['type_manager'],
            'position': database['position']
        }
