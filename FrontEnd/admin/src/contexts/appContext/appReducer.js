import { SET_DRAWER_WIDTH } from "./appActionTypes";

const appReducer = (state, action) => {
  switch (action.type) {
    case SET_DRAWER_WIDTH:
      return {
        ...state,
        drawerWidth: action.drawerWidth,
      };
  }
};

export default appReducer;
