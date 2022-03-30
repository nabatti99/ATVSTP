import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./config/loadTheme";

import RootLayout from "./layout/RootLayout";
import Statistic from "./views/Statistic";
import NotFound from "./views/NotFound";
import EditProfileModal from "./views/UserManagement/Modals/EditProfileModal";
import UserDetails from "./views/UserManagement/UserDetails";
import UsersManagement from "./views/UserManagement/UsersManagement";
import AddNewProfileModal from "./views/UserManagement/Modals/AddNewProfileModal";
import DeleteProfileModal from "./views/UserManagement/Modals/DeleteProfileModal";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Statistic />} />

            <Route path="UsersManagement" element={<UsersManagement />}>
              <Route path=":email" element={<EditProfileModal />} />
              <Route path="Add" element={<AddNewProfileModal />} />
              <Route path="Delete" element={<DeleteProfileModal />} />
            </Route>
            <Route path="UserDetails/:email" element={<UserDetails />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
