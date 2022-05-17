import { DELETE_ACCESS_TOKEN, SET_DRAWER_WIDTH, UPDATE_ACCESS_TOKEN } from "./appActionTypes";

const appReducer = (state, action) => {
  switch (action.type) {
    case SET_DRAWER_WIDTH:
      return {
        ...state,
        drawerWidth: action.drawerWidth,
      };

    case UPDATE_ACCESS_TOKEN:
      localStorage.setItem("access-token", action.accessToken);
      localStorage.setItem("user-email", action.userEmail);
      localStorage.setItem("type-manager", action.type_manager);
      return {
        ...state,
        accessToken: action.accessToken,
        userEmail: action.userEmail,
        type_manager: action.type_manager,
      };

    case DELETE_ACCESS_TOKEN:
      localStorage.removeItem("access-token");
      localStorage.removeItem("user-email");
      localStorage.removeItem("type-manager");
      return {
        ...state,
        accessToken: null,
        userEmail: null,
      };

    default:
      return state;
  }
};

export default appReducer;
