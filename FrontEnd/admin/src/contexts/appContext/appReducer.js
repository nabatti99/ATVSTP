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
      return {
        ...state,
        accessToken: action.accessToken,
      };

    case DELETE_ACCESS_TOKEN:
      localStorage.removeItem("access-token");
      return {
        ...state,
        accessToken: null,
      };

    default:
      return state;
  }
};

export default appReducer;
