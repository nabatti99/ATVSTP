from datetime import datetime


class SuperiorReporting:
    def __init__(self,
                 title: str,
                 writer: str,
                 reporting_area: str,
                 inspected_groceries: list,
                 content: str,
                 regulator_agency: str,
                 updated_at: datetime,
                 is_draft: bool):

        self.__title = title
        self.__writer = writer
        self.__reporting_area = reporting_area
        self.__inspected_groceries = inspected_groceries
        self.__content = content
        self.__regulator_agency = regulator_agency
        self.__updated_at = updated_at
        self.__is_draft = is_draft

    def to_dict(self):
        return {
            'title': self.__title,
            'writer': self.__writer,
            'reporting_area': self.__reporting_area,
            'inspected_groceries': self.__inspected_groceries,
            'content': self.__content,
            'regulator_agency': self.__regulator_agency,
            'updated_at': self.__updated_at,
            'is_draft': self.__is_draft
        }