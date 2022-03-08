class Manager:
    def __init__(self, name, hash_password, email, address, phone, type, position):
        self.name = name
        self.hash_password = hash_password
        self.address = address
        self.email = email
        self.phone = phone
        self.type = type
        self.position = position

    def to_dict(self):
        return {
            'name': self.name,
            'hash_password': self.hash_password,
            'email': self.email,
            'phone': self.phone,
            'type': self.type,
            'position': self.position
        }
