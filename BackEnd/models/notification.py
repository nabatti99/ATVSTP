from datetime import time


class Notification:
    def __init__(self,
                 sender: str = '',
                 title: str = '',
                 content: str = '',
                 is_draft: bool = False,
                 receiver: list = []
                 ):

        self.title = title
        self.content = content
        self.is_draft = is_draft

        seconds = time.time()
        self.time = time.ctime(seconds)
        self.sender = sender
        self.receiver = receiver

    def to_dict(self):
        return {
            'sender': self.sender,
            'title': self.title,
            'content': self.content,
            'time': self.time,
            'is_draft': self.is_draft,
            'receiver': self.receiver
        }


