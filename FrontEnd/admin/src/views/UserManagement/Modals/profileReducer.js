export const NAME_CHANGE = "NAME_CHANGE";
export const EMAIL_CHANGE = "EMAIL_CHANGE";
export const TYPE_MANAGER = "TYPE_MANAGER";
export const PHONE_CHANGE = "PHONE_CHANGE";
export const ADDRESS_CHANGE = "ADDRESS_CHANGE";
export const ADDRESS_WORK_FROM_CHANGE = "ADDRESS_WORK_FROM_CHANGE";
export const AVATAR_CHANGE = "AVATAR_CHANGE";

export function profileReducer(state, action) {
  switch (action.type) {
    case NAME_CHANGE:
      return {
        ...state,
        name: action.name,
      };

    case EMAIL_CHANGE:
      return {
        ...state,
        email: action.email,
      };

    case TYPE_MANAGER:
      return {
        ...state,
        type_manager: action.type_manager,
      };

    case PHONE_CHANGE:
      return {
        ...state,
        phone: action.phone,
      };

    case ADDRESS_CHANGE:
      return {
        ...state,
        address: action.address,
      };

    case ADDRESS_WORK_FROM_CHANGE:
      return {
        ...state,
        work_from: action.addressWorkFrom,
      };

    case AVATAR_CHANGE:
      return {
        ...state,
        avatar: action.avatar,
      };

    default:
      return state;
  }
}
