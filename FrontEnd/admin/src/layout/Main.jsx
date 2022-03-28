import { AppBar, Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import LeaderBoardSvg from "../components/Icons/LeaderBoardSvg";

import { connectAppContext } from "../contexts/appContext/appContext";

function Main({ appContext, children }) {
  const { drawerWidth } = appContext;

  return (
    <Stack
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        height: "100vh",
      }}
    >
      <AppBar
        position="fixed"
        color="white"
        elevation={2}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Stack height={62} justifyContent="center" pr={2}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" flexGrow={1}>
            <Box mr={4}>
              <IconButton>
                <LeaderBoardSvg />
              </IconButton>
              <IconButton>
                <LeaderBoardSvg />
              </IconButton>
            </Box>
            <Typography variant="strong" mr={2}>
              Xin chào, Minh
            </Typography>
            <Avatar
              src="https://i.pravatar.cc/40"
              sx={{ width: 40, height: 40 }}
              border={2}
              borderColor="blue.500"
            />
          </Stack>
        </Stack>
      </AppBar>

      <Stack flexGrow={1}>
        <Box height={62} />

        <Box flexGrow={1} bgcolor="gray.50" p={4}>
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}

export default connectAppContext(Main);
