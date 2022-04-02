import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import UserDataGrid from "./UserDataGrid";

import useRequest from "../../hooks/useRequest";
import { EDIT_PROFILE, ADD_NEW_PROFILE, DELETE_PROFILE } from "./Modals/profileActionTypes";
import UserSearchBar from "./UserSearchBar";

function UsersManagement() {
  const request = useRequest();

  // Handle table events
  const [shouldTableUpdate, setShouldTableUpdate] = useState(false);

  const handleTableUpdated = () => {
    setShouldTableUpdate(false);
  };

  // Handle search bar events
  const [query, setQuery] = useState({
    searchGroup: "name",
    keyword: "",
  });
  const handleChanged = (searchGroup, keyword) => {
    setQuery({
      searchGroup,
      keyword,
    });

    setShouldTableUpdate(true);
  };

  // Trigger execute table actions
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.isSubmitted) {
      const profile = state.profileData;

      Promise.resolve()
        .then(() => {
          switch (state.action) {
            case EDIT_PROFILE:
              return request.put(`manager/update_a_manager/${profile.email}`, {
                ...profile,
              });

            case ADD_NEW_PROFILE:
              return request.post("manager/create_new_manager", {
                ...profile,
              });

            case DELETE_PROFILE:
              return request.delete(`/manager/delete_a_manager/${profile.email}`);

            default:
              throw new Error("Không thể tạo mới người dùng");
          }
        })
        .then(() => {
          setShouldTableUpdate(true);
        });
    }
  }, [state]);

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Quản lí nhân sự
      </Typography>

      <UserSearchBar onChange={handleChanged} />

      <UserDataGrid shouldTableUpdate={shouldTableUpdate} query={query} onTableUpdate={handleTableUpdated} />

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default UsersManagement;
