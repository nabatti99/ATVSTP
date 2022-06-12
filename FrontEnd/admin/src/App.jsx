import { ThemeProvider } from "@mui/material/styles";

import theme from "./config/loadTheme";
import "./config/loadCustom";

import { AppContextProvider } from "./contexts/appContext/appContext";
import Navigator from "./Navigator";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Navigator />
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
