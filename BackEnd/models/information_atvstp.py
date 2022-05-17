class InformationATVSTP:
    def __init__(self, title, contents, writer, edit_by, delete_status, create_at, update_at):
        self.title = title
        self.contents = contents
        self.writer = writer # user email
        self.edit_by = edit_by # user email
        self.delete_status = delete_status # 0: da xoa, 1: binh thuong
        self.create_at = create_at
        self.update_at = update_at

    def to_dict(self):
        return {
            'title': self.title,
            'contents': self.contents,
            'writer': self.writer,
            'edit_by': self.edit_by,
            'delete_status': self.delete_status,
            'create_at': self.create_at,
            'update_at': self.update_at
        }