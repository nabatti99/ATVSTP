import { DELETE_ACCESS_TOKEN, SET_DRAWER_WIDTH, UPDATE_ACCESS_TOKEN } from "./appActionTypes";

export const setDrawerWidth = (drawerWidth) => ({
  type: SET_DRAWER_WIDTH,
  drawerWidth,
});

export const updateAccessToken = (accessToken, userEmail, type_manager) => ({
  type: UPDATE_ACCESS_TOKEN,
  accessToken,
  userEmail,
  type_manager,
});

export const deleteAccessToken = () => ({
  type: DELETE_ACCESS_TOKEN,
});
