import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./config/loadTheme";

import RootLayout from "./layout/RootLayout";
import Statistic from "./views/Statistic";
import UsersManagement from "./views/UsersManagement";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="UsersManagement" element={<UsersManagement />} />
            <Route path="Statistic" element={<Statistic />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
