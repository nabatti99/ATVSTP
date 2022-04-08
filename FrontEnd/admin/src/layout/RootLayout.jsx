import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../views/ErrorBoundary";
import LeftDrawer from "./LeftDrawer";
import Main from "./Main";

function RootLayout() {
  return (
    <ErrorBoundary>
      <Main>
        <Outlet />
      </Main>

      <LeftDrawer />
    </ErrorBoundary>
  );
}

export default RootLayout;
