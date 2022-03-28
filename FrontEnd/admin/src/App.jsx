import { ThemeProvider } from "@mui/material/styles";

import theme from "./config/loadTheme";
import Main from "./layout/Main";
import LeftDrawer from "./layout/LeftDrawer";

import { AppContextProvider } from "./contexts/appContext/appContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Main />

        <LeftDrawer />
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
