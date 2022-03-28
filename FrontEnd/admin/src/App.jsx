import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LeaderBoardSvg from "./components/Icons/LeaderBoardSvg";
import theme from "./config/loadTheme";

function App() {
  const drawerWidth = 248;

  return (
    <ThemeProvider theme={theme}>
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
          <Toolbar>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" flexGrow={1}>
              <LeaderBoardSvg mr={2} />
              <LeaderBoardSvg mr={4} />
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
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Typography variant="strong">Content</Typography>
      </Box>

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
        <Toolbar>Icon</Toolbar>
        <List>
          <ListItem button>
            <ListItemIcon>
              <LeaderBoardSvg />
            </ListItemIcon>
            <ListItemText>123</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
}

export default App;
