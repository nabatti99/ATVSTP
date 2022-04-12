export const NAME_CHANGE = "NAME_CHANGE";
export const ADDRESS_CHANGE = "ADDRESS_CHANGE";
export const OWNER_CHANGE = "OWNER_CHANGE";
export const PHONE_NUMBER_CHANGE = "PHONE_NUMBER_CHANGE";
export const STATUS_CHANGE = "STATUS_CHANGE";
export const ITEMS_CHANGE = "ITEMS_CHANGE";
export const CERTIFICATES_CHANGE = "CERTIFICATES_CHANGE";
export const AVATAR_CHANGE = "AVATAR_CHANGE";

export function groceryReducer(state, action) {
  switch (action.type) {
    case NAME_CHANGE:
      return {
        ...state,
        name: action.name,
      };

    case OWNER_CHANGE:
      return {
        ...state,
        owner: action.owner,
      };

    case ADDRESS_CHANGE:
      return {
        ...state,
        address: action.address,
      };

    case PHONE_NUMBER_CHANGE:
      return {
        ...state,
        phone_number: action.phoneNumber,
      };

    case STATUS_CHANGE:
      return {
        ...state,
        status: action.status,
      };

    case ITEMS_CHANGE:
      return {
        ...state,
        item: action.items,
      };

    case CERTIFICATES_CHANGE:
      return {
        ...state,
        certificate: action.certificates,
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
