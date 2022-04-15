class SuperiorReporting:
    def __init__(self, title, writer, reporting_area, inspected_groceries, content, administrations_atvstp):
        self.__title = title
        self.__writer = writer
        self.__reporting_area = reporting_area
        self.__inspected_groceries = inspected_groceries
        self.__content = content
        self.__administrations_atvstp = administrations_atvstp

    def to_dict(self):
        return {
            'title': self.__title,
            'writer': self.__writer,
            'reporting_area': self.__reporting_area,
            'inspected_groceries': self.__inspected_groceries,
            'content': self.__content,
            'administrations_atvstp': self.__administrations_atvstp
        }