class FeedbackOfPeople:
    def __init__(self, fullname, address, phone_number, department, content, create_at):
        self.fullname = fullname
        self.address = address
        self.phone_number = phone_number
        self.department = department
        self.content = content
        self.create_at = create_at

    def to_dict(self):
        return {
            'fullname': self.fullname,
            'address': self.address,
            'phone_number': self.phone_number,
            'department': self.department,
            'content': self.content,
            'create_at': self.create_at
        }