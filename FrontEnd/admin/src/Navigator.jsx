import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Statistic from "./views/Statistic/Statistic";
import AddNewProfileModal from "./views/UserManagement/Modals/AddNewProfileModal";
import DeleteProfileModal from "./views/UserManagement/Modals/DeleteProfileModal";
import EditProfileModal from "./views/UserManagement/Modals/EditProfileModal";
import UserDetails from "./views/UserManagement/UserDetails";
import GroceriesManagement from "./views/GroceryManagement/GroceryManagement";
import UsersManagement from "./views/UserManagement/UsersManagement";
import CertificatesManagement from "./views/CertificateManagement/CertificatesManagement";
import EditCertificateModal from "./views/CertificateManagement/Modals/EditCertificateModal";
import AddNewCertificateModal from "./views/CertificateManagement/Modals/AddNewCertificateModal";
import DeleteCertificateModal from "./views/CertificateManagement/Modals/DeleteCertificateModal";
import AddNewGroceryModal from "./views/GroceryManagement/Modals/AddNewGroceryModal";
import EditGroceryModal from "views/GroceryManagement/Modals/EditGroceryModal";
import DeleteGroceryModal from "views/GroceryManagement/Modals/DeleteGroceryModal";
import GroceryDetails from "views/GroceryManagement/GroceryDetails";
import CertificateDetails from "views/CertificateManagement/CertificateDetails";
import InspectionSchedulesManagement from "views/InspectionScheduleManagement/InspectionSchedulesManagement";
import AdministrationsManagement from "views/AdministrationManagement/AdministrationsManagement";
import NotificationsManagement from "views/NotificationManagement/NotificationsManagement";
import PostsManagement from "views/PostManagement/PostsManagement";
import EditPostModal from "views/PostManagement/Modals/EditPostModal";
import AddNewPostModal from "views/PostManagement/Modals/AddNewPostModal";
import DeletePostModal from "views/PostManagement/Modals/DeletePostModal";
import AddNewAdministrationModal from "views/AdministrationManagement/Modals/AddNewAdministrationModal";
import DeleteAdministrationModal from "views/AdministrationManagement/Modals/DeleteAdministrationModal";
import EditAdministrationModal from "views/AdministrationManagement/Modals/EditAdministrationModal";

import { connectAppContext } from "./contexts/appContext/appContext";
import AdministrationDetails from "views/AdministrationManagement/AdministrationDetails";
import AddNewInspectionScheduleModal from "views/InspectionScheduleManagement/Modals/AddNewInspectionScheduleModal";
import EditInspectionScheduleModal from "views/InspectionScheduleManagement/Modals/EditInspectionScheduleModal";
import InspectionScheduleDetails from "views/InspectionScheduleManagement/InspectionScheduleDetails";
import DeleteInspectionScheduleModal from "views/InspectionScheduleManagement/Modals/DeleteInspectionScheduleModal";
import Default from "views/Default";
import SuperiorReportsManagement from "views/SuperiorReportManagement/SuperiorReportsManagement";
import SuperiorReportDetails from "views/SuperiorReportManagement/SuperiorReportDetails";
import AddNewSuperiorReportModal from "views/SuperiorReportManagement/Modals/AddNewSuperiorReportModal";
import EditSuperiorReportModal from "views/SuperiorReportManagement/Modals/EditSuperiorReportModal";
import DeleteSuperiorReportModal from "views/SuperiorReportManagement/Modals/DeleteSuperiorReportModal";
import PrivateNotificationDetail from "views/NotificationManagement/PrivateNotification/PrivateDetail";
import FeedbackNotificationDetail from "views/NotificationManagement/FeedbackNotification/FeedbackDetail";
import ResetPasswordModal from "views/UserManagement/Modals/ResetPasswordModal";
import { Fragment } from "react";
import PostDetails from "views/PostManagement/PostDetails";
import AddNewPrivateNotificationModal from "views/NotificationManagement/PrivateNotification/Modal/AddNewPrivateNotificationModal";

function Navigator({ appContext }) {
  const { accessToken, type_manager } = appContext;
  const isAdmin = type_manager === "admin";

  return (
    <BrowserRouter>
      {accessToken ? (
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Default />} />

            <Route path="Statistic" element={<Statistic />} />

            {isAdmin ? (
              <Fragment>
                <Route path="UsersManagement" element={<UsersManagement />}>
                  <Route path=":email" element={<EditProfileModal />} />
                  <Route path="Add" element={<AddNewProfileModal />} />
                  <Route path="Delete" element={<DeleteProfileModal />} />
                </Route>
                <Route path="UserDetail/:email" element={<UserDetails />}>
                  <Route path="Edit" element={<EditProfileModal />} />
                  <Route path="Delete" element={<DeleteProfileModal />} />
                  <Route path="ResetPassword" element={<ResetPasswordModal />} />
                </Route>
              </Fragment>
            ) : (
              <Route path="UserDetail/:email" element={<UserDetails />}>
                <Route path="Edit" element={<EditProfileModal />} />
                <Route path="ResetPassword" element={<ResetPasswordModal />} />
              </Route>
            )}

            {isAdmin ? (
              <Fragment>
                <Route path="GroceriesManagement" element={<GroceriesManagement />}>
                  <Route path=":name" element={<EditGroceryModal />} />
                  <Route path="Add" element={<AddNewGroceryModal />} />
                  <Route path="Delete" element={<DeleteGroceryModal />} />
                </Route>
                <Route path="GroceryDetail/:name" element={<GroceryDetails />}>
                  <Route path="Edit" element={<EditGroceryModal />} />
                  <Route path="Delete" element={<DeleteGroceryModal />} />
                </Route>
              </Fragment>
            ) : (
              <Route path="GroceryDetail/:name" element={<GroceryDetails />} />
            )}

            <Route path="CertificatesManagement" element={<CertificatesManagement />}>
              <Route path=":name" element={<EditCertificateModal />} />
              <Route path="Add" element={<AddNewCertificateModal />} />
              <Route path="Delete" element={<DeleteCertificateModal />} />
            </Route>
            <Route path="CertificateDetail/:name" element={<CertificateDetails />}>
              <Route path="Edit" element={<EditCertificateModal />} />
              <Route path="Delete" element={<DeleteCertificateModal />} />
            </Route>

            <Route path="InspectionSchedulesManagement" element={<InspectionSchedulesManagement />}>
              <Route path=":name" element={<EditInspectionScheduleModal />} />
              <Route path="Add" element={<AddNewInspectionScheduleModal />} />
              <Route path="Delete" element={<DeleteInspectionScheduleModal />} />
            </Route>
            <Route path="InspectionScheduleDetail/:_id" element={<InspectionScheduleDetails />}>
              <Route path="Edit" element={<EditInspectionScheduleModal />} />
              <Route path="Delete" element={<DeleteInspectionScheduleModal />} />
            </Route>

            {isAdmin && (
              <Fragment>
                <Route path="AdministrationsManagement" element={<AdministrationsManagement />}>
                  <Route path=":_id" element={<EditAdministrationModal />} />
                  <Route path="Add" element={<AddNewAdministrationModal />} />
                  <Route path="Delete" element={<DeleteAdministrationModal />} />
                </Route>
                <Route path="AdministrationDetail/:_id" element={<AdministrationDetails />}>
                  <Route path="Edit" element={<EditAdministrationModal />} />
                  <Route path="Delete" element={<DeleteAdministrationModal />} />
                </Route>
              </Fragment>
            )}

            <Route path="SuperiorReportsManagement" element={<SuperiorReportsManagement />}>
              <Route path=":_id" element={<EditSuperiorReportModal />} />
              <Route path="Add" element={<AddNewSuperiorReportModal />} />
              <Route path="Delete" element={<DeleteSuperiorReportModal />} />
            </Route>
            <Route path="SuperiorReportDetail/:_id" element={<SuperiorReportDetails />}>
              <Route path="Edit" element={<EditSuperiorReportModal />} />
              <Route path="Delete" element={<DeleteSuperiorReportModal />} />
            </Route>

            <Route path="PostsManagement" element={<PostsManagement />}>
              <Route path=":_id" element={<EditPostModal />} />
              <Route path="Add" element={<AddNewPostModal />} />
              <Route path="Delete" element={<DeletePostModal />} />
            </Route>
            <Route path="PostDetail/:_id" element={<PostDetails />}>
              <Route path="Edit" element={<EditPostModal />} />
              <Route path="Delete" element={<DeletePostModal />} />
            </Route>

            <Route path="NotificationsManagement" element={<NotificationsManagement />}>
              <Route path="Private/:id" element={<PrivateNotificationDetail />} />
              <Route path="Feedback/:id" element={<FeedbackNotificationDetail />} />
              <Route path="NewMessage" element={<AddNewPrivateNotificationModal />} />
            </Route>

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
