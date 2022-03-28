class Administration_ATVSTP:
    def __init__(self, name, phone_number, responsible):
        self.name = name
        self.phone_number = phone_number
        self.responsible = responsible

    def to_dict(self):
        return {
            'name': self.name,
            'phone_number': self.phone_number,
            'responsible': self.responsible
        }
