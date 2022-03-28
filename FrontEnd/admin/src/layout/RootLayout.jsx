import { Outlet } from "react-router-dom";
import { AppContextProvider } from "../contexts/appContext/appContext";
import LeftDrawer from "./LeftDrawer";
import Main from "./Main";

function RootLayout() {
  return (
    <AppContextProvider>
      <Main>
        <Outlet />
      </Main>

      <LeftDrawer />
    </AppContextProvider>
  );
}

export default RootLayout;
