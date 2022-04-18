class Certificate:
    def __init__(self,
                 name='',
                 manager='',
                 effective_time=1,
                 last_update=None,
                 is_active=True,
                 image_url=''):
        self.name = name
        self.manager = manager
        self.effective_time = effective_time
        self.last_update = last_update
        self.is_active = is_active
        self.image_url = image_url

    def to_dict(self):
        return {
            'name': self.name,
            'manager': self.manager,
            'effective_time': self.effective_time,
            'last_update': self.last_update,
            'is_active': self.is_active,
            'image_url': self.image_url
        }
