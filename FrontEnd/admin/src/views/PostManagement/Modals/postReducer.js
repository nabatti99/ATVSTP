export const TITLE_CHANGE = "TITLE_CHANGE";
export const CONTENT_CHANGE = "CONTENT_CHANGE";
export const WRITER_CHANGE = "WRITER_CHANGE";

export function postReducer(state, action) {
  switch (action.type) {
    case TITLE_CHANGE:
      return {
        ...state,
        title: action.title,
      };

    case CONTENT_CHANGE:
      return {
        ...state,
        content: action.content,
      };

    case WRITER_CHANGE:
      return {
        ...state,
        writer: action.writer,
      };

    default:
      return state;
  }
}
