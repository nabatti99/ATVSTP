class Notification:
    def __init__(self,
                 sender: str = '',
                 title: str = '',
                 is_draft: bool = False,
                 receivers: list = [],
                 messages: list = []
                 ):

        self.title = title
        self.is_draft = is_draft
        self.sender = sender
        self.receivers = receivers
        self.messages = messages

    def to_dict(self):
        return {
            'sender': self.sender,
            'title': self.title,
            'receivers': self.receivers,
            'messages': self.messages,
            'is_draft': self.is_draft
        }


