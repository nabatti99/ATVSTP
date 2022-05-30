class FeedbackOfPeople:
    def __init__(self, fullname, email, phone_number, content, create_at):
        self.fullname = fullname
        self.email = email
        self.phone_number = phone_number
        self.content = content
        self.create_at = create_at

    def to_dict(self):
        return {
            'fullname': self.fullname,
            'email': self.email,
            'phone_number': self.phone_number,
            'content': self.content,
            'create_at': self.create_at
        }