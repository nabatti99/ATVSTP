import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import GroceriesManagement from "./views/GroceryManagement/GroceryManagement";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Statistic from "./views/Statistic";
import AddNewProfileModal from "./views/UserManagement/Modals/AddNewProfileModal";
import DeleteProfileModal from "./views/UserManagement/Modals/DeleteProfileModal";
import EditProfileModal from "./views/UserManagement/Modals/EditProfileModal";
import UserDetails from "./views/UserManagement/UserDetails";
import UsersManagement from "./views/UserManagement/UsersManagement";

import { connectAppContext } from "./contexts/appContext/appContext";

function Navigator({ appContext }) {
  const { accessToken } = appContext;

  return (
    <BrowserRouter>
      {accessToken ? (
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Statistic />} />

            <Route path="UsersManagement" element={<UsersManagement />}>
              <Route path=":email" element={<EditProfileModal />} />
              <Route path="Add" element={<AddNewProfileModal />} />
              <Route path="Delete" element={<DeleteProfileModal />} />
            </Route>
            <Route path="UserDetails/:email" element={<UserDetails />} />

            <Route path="StoresManagement" element={<GroceriesManagement />}></Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Navigate to="/Login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default connectAppContext(Navigator);
