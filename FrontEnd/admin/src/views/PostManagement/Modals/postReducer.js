export const TITLE_CHANGE = "TITLE_CHANGE";
export const CONTENTS_CHANGE = "CONTENTS_CHANGE";
export const WRITER_CHANGE = "WRITER_CHANGE";

export function postReducer(state, action) {
  switch (action.type) {
    case TITLE_CHANGE:
      return {
        ...state,
        title: action.title,
      };

    case CONTENTS_CHANGE:
      return {
        ...state,
        contents: action.contents,
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
