export const SCHEDULE_CHANGE = "SCHEDULE_CHANGE";
export const AUTHORITY_CHANGE = "AUTHORITY_CHANGE";
export const GROCERIES_CHANGE = "GROCERIES_CHANGE";
export const ASSIGNED_TO_CHANGE = "ASSIGNED_TO_CHANGE";
export const CONTENT_CHANGE = "CONTENT_CHANGE";
export const IS_DRAFT_CHANGE = "IS_DRAFT_CHANGE";

export function inspectionScheduleReducer(state, action) {
  switch (action.type) {
    case SCHEDULE_CHANGE:
      return {
        ...state,
        schedule: action.schedule,
      };

    case AUTHORITY_CHANGE:
      return {
        ...state,
        authority: action.authority,
      };

    case GROCERIES_CHANGE:
      return {
        ...state,
        groceries: action.groceries,
      };

    case ASSIGNED_TO_CHANGE:
      return {
        ...state,
        assigned_to: action.assigned_to,
      };

    case CONTENT_CHANGE:
      return {
        ...state,
        content: action.content,
      };

    case IS_DRAFT_CHANGE:
      return {
        ...state,
        is_draft: action.is_draft,
      };

    default:
      return state;
  }
}
