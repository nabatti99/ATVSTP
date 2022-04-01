class InformationATVSTP:
    def __init__(self, title, area, content, writer, edit_by, delete_status, create_at, update_at):
        self.title = title
        self.area = area
        self.content = content
        self.writer = writer # user id
        self.edit_by = edit_by # user id
        self.delete_status = delete_status # 0: da xoa, 1: binh thuong
        self.create_at = create_at
        self.update_at = update_at

    def to_dict(self):
        return {
            'title': self.title,
            'area': self.area,
            'content': self.content,
            'writer': self.writer,
            'edit_by': self.edit_by,
            'delete_status': self.delete_status,
            'create_at': self.create_at,
            'update_at': self.update_at
        }