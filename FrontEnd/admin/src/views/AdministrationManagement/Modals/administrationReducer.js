export const NAME_CHANGE = "NAME_CHANGE";
export const PHONE_CHANGE = "PHONE_CHANGE";
export const RESPONSIBLE_CHANGE = "RESPONSIBLE_CHANGE";

export function administrationReducer(state, action) {
  switch (action.type) {
    case NAME_CHANGE:
      return {
        ...state,
        name: action.name,
      };

    case PHONE_CHANGE:
      return {
        ...state,
        phone_number: action.phoneNumber,
      };

    case RESPONSIBLE_CHANGE:
      return {
        ...state,
        responsible: action.responsible,
      };

    default:
      return state;
  }
}
