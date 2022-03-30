import { Stack, Typography, Paper, InputBase, IconButton } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import SearchSvg from "../../components/Icons/SearchSvg";
import UserDataGrid from "./UserDataGrid";

function UsersManagement() {
  const { state } = useLocation();

  console.log(state);

  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Quản lí nhân sự
      </Typography>

      <Paper elevation={2} sx={{ padding: 2, marginTop: 4 }}>
        <Paper variant="outlined" sx={{ borderColor: "gray.200", display: "flex", alignItems: "center" }}>
          <InputBase
            sx={{
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 2,
              paddingRight: 2,
              flexGrow: 1,
            }}
            placeholder="Tìm kiếm theo ID/Tên/Email"
          />
          <IconButton sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 2 }}>
            <SearchSvg size={16} />
          </IconButton>
        </Paper>
      </Paper>

      <UserDataGrid />

      {/* Portal to render Modals */}
      <Outlet />
    </Stack>
  );
}

export default UsersManagement;
