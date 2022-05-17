import { createContext, useEffect, useReducer } from "react";
import useRequest from "hooks/useRequest";

import appReducer from "./appReducer";

const appContext = createContext();

export function AppContextProvider({ children }) {
  const [value, dispatch] = useReducer(appReducer, {
    drawerWidth: 248,
    accessToken: localStorage.getItem("access-token"),
    userEmail: localStorage.getItem("user-email"),
    type_manager: localStorage.getItem("type-manager"),
  });

  const ContextProvider = appContext.Provider;

  return (
    <ContextProvider
      value={{
        appContext: value,
        dispatch,
      }}
    >
      {children}
    </ContextProvider>
  );
}

export function connectAppContext(Component) {
  const ContextConsumer = appContext.Consumer;

  return ({ ...props }) => <ContextConsumer>{(value) => <Component {...props} {...value} />}</ContextConsumer>;
}
