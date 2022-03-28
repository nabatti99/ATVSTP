import { Stack, Typography, Box, Grid, Paper, InputBase, TextField, IconButton } from "@mui/material";
import LeaderBoardSvg from "../../components/Icons/LeaderBoardSvg";
import UserDataGrid from "./UserDataGrid";

function UsersManagement() {
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
            <LeaderBoardSvg size={16} />
          </IconButton>
        </Paper>
      </Paper>

      <UserDataGrid />
    </Stack>
  );
}

export default UsersManagement;
