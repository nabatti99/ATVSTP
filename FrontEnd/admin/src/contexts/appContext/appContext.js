import { createContext, useReducer } from "react";
import appReducer from "./appReducer";

const appContext = createContext();

export function AppContextProvider({ children }) {
  const [value, dispatch] = useReducer(appReducer, {
    drawerWidth: 248,
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
