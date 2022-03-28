class Grocery:
    def __init__(self,
                 name: str = '',
                 owner: str = '',
                 phone_number: str = '',
                 address: dict = None,
                 status: str = '',
                 item: dict = None,
                 certificate: str = ''):

        self.name = name
        self.owner = owner
        self.phone_number = phone_number
        self.address = address
        self.status = status
        self.item = item
        self.certificate = certificate

    def to_dict(self):
        return {
            'name': self.name,
            'owner': self.owner,
            'phone_number': self.phone_number,
            'address': self.address,
            'status': self.status,
            'item': self.item,
            'certificate': self.certificate
        }