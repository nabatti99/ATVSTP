from datetime import datetime


class InspectionSchedule:
    def __init__(self,
                 authority: str,
                 groceries: list,
                 content: str,
                 assigned_to: list,
                 schedule: datetime,
                 updated_by: str,
                 is_draft: bool = True):

        self.__authority = authority
        self.__groceries = groceries
        self.__content = content
        self.__assigned_to = assigned_to
        self.__schedule = schedule
        self.__updated_by = updated_by
        self.__is_draft = is_draft

    def to_dict(self):
        return {
            'authority': self.__authority,
            'groceries': self.__groceries,
            'content': self.__content,
            'assigned_to': self.__assigned_to,
            'schedule': self.__schedule,
            'updated_by': self.__updated_by,
            'is_draft': self.__is_draft
        }
