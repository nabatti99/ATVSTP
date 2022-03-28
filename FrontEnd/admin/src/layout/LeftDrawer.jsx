import { Drawer, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";

import { connectAppContext } from "../contexts/appContext/appContext";
import LeaderBoardSvg from "../components/Icons/LeaderBoardSvg";

function LeftDrawer({ appContext }) {
  const { drawerWidth } = appContext;

  return (
    <Drawer
      variant="permanent"
      elevation={0}
      open
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Stack minHeight={62} justifyContent="center" pl={2}>
        <Stack direction="row" alignItems="center">
          <LeaderBoardSvg mr={1} />
          <Typography variant="h5">ATVSTP - Admin</Typography>
        </Stack>
      </Stack>
      <List>
        <ListItem button>
          <ListItemIcon>
            <LeaderBoardSvg />
          </ListItemIcon>
          <ListItemText>123</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default connectAppContext(LeftDrawer);
