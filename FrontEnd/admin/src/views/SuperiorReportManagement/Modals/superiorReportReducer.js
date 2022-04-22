export const TITLE_CHANGE = "TITLE_CHANGE";
export const WRITER_CHANGE = "WRITER_CHANGE";
export const REPORTING_AREA_CHANGE = "REPORTING_AREA_CHANGE";
export const INSPECTED_GROCERIES_CHANGE = "INSPECTED_GROCERIES_CHANGE";
export const CONTENT_CHANGE = "CONTENT_CHANGE";
export const REGULATOR_AGENCY_CHANGE = "REGULATOR_AGENCY_CHANGE";
export const IS_DRAFT_CHANGE = "IS_DRAFT_CHANGE";

export function superiorReportReducer(state, action) {
  switch (action.type) {
    case TITLE_CHANGE:
      return {
        ...state,
        title: action.title,
      };

    case WRITER_CHANGE:
      return {
        ...state,
        writer: action.writer,
      };

    case CONTENT_CHANGE:
      return {
        ...state,
        content: action.content,
      };

    case REPORTING_AREA_CHANGE:
      return {
        ...state,
        reporting_area: action.reporting_area,
      };

    case INSPECTED_GROCERIES_CHANGE:
      return {
        ...state,
        inspected_groceries: action.inspected_groceries,
      };

    case REGULATOR_AGENCY_CHANGE:
      return {
        ...state,
        regulator_agency: action.regulator_agency,
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
