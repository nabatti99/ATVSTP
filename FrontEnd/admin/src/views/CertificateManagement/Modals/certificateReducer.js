export const NAME_CHANGE = "NAME_CHANGE";
export const MANAGER_CHANGE = "MANAGER_CHANGE";
export const EFFECTIVE_TIME_CHANGE = "EFFECTIVE_TIME_CHANGE";
export const AVATAR_CHANGE = "AVATAR_CHANGE";

export function certificateReducer(state, action) {
  switch (action.type) {
    case NAME_CHANGE:
      return {
        ...state,
        name: action.name,
      };

    case MANAGER_CHANGE:
      return {
        ...state,
        manager: action.manager,
      };

    case EFFECTIVE_TIME_CHANGE:
      return {
        ...state,
        effectiveTime: action.effectiveTime,
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
