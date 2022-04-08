import { SET_DRAWER_WIDTH, UPDATE_ACCESS_TOKEN } from "./appActionTypes";

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

    default:
      return state;
  }
};

export default appReducer;
