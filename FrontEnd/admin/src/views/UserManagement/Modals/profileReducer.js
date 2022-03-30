export const NAME_CHANGE = "NAME_CHANGE";
export const EMAIL_CHANGE = "EMAIL_CHANGE";
export const PASSWORD_CHANGE = "PASSWORD_CHANGE";
export const PHONE_CHANGE = "PHONE_CHANGE";
export const ADDRESS_CHANGE = "ADDRESS_CHANGE";
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

    case PASSWORD_CHANGE:
      return {
        ...state,
        password: action.password,
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

    case AVATAR_CHANGE:
      return {
        ...state,
        avatar: action.avatar,
      };

    default:
      return state;
  }
}
