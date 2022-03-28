import { AppBar, Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import LeaderBoardSvg from "../components/Icons/LeaderBoardSvg";

import { connectAppContext } from "../contexts/appContext/appContext";

function Main({ appContext }) {
  const { drawerWidth } = appContext;

  return (
    <Box
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
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
        <Stack minHeight={62} justifyContent="center" pr={2}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" flexGrow={1}>
            <IconButton>
              <LeaderBoardSvg mr={2} />
            </IconButton>
            <IconButton>
              <LeaderBoardSvg mr={4} />
            </IconButton>
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

      <Box minHeight={62} />
      <Typography variant="strong">Content</Typography>
    </Box>
  );
}

export default connectAppContext(Main);
