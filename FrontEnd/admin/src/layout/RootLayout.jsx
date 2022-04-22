import { Fragment, useMemo } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../views/ErrorBoundary";
import LeftDrawer from "./LeftDrawer";
import Main from "./Main";

function RootLayout() {
  const body = useMemo(
    () => (
      <Fragment>
        <Main>
          <Outlet />
        </Main>

        <LeftDrawer />
      </Fragment>
    ),
    []
  );

  return <ErrorBoundary>{body}</ErrorBoundary>;
}

export default RootLayout;
