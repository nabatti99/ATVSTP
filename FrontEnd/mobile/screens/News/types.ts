export type News = {
  _id: string;
  title: string;
  update_at?: Date;
  writer: string;
  edit_by: string;
  contents: {
    type: "header" | "image" | "text";
    value?: string;
    url?: string;
    caption?: string;
  }[];
};
