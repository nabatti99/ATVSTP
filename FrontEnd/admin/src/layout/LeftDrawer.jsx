import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

import { connectAppContext } from "../contexts/appContext/appContext";
import LeaderBoardSvg from "../components/Icons/LeaderBoardSvg";

function LeftDrawer({ appContext }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { drawerWidth } = appContext;

  const navItems = [
    {
      Icon: LeaderBoardSvg,
      path: "/Statistic",
      text: "Thống kê",
    },
    {
      Icon: LeaderBoardSvg,
      path: "/UsersManagement",
      text: "Nhân sự",
    },
  ];

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
          <LeaderBoardSvg mr={1} size={32} />
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            ATVSTP - Admin
          </Typography>
        </Stack>
      </Stack>

      <List>
        {navItems.map(({ Icon, path, text }) => {
          const isSelected = location.pathname == path;

          return (
            <ListItemButton
              onClick={() => navigate(path)}
              selected={isSelected}
              key={text}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "unset",
                  color: "blue.500",

                  "&:hover": {
                    backgroundColor: "gray.50",
                  },
                  "&:before": {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 4,
                    height: "100%",
                    backgroundColor: "blue.500",
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                    content: '""',
                  },
                },
                "&:hover": {
                  backgroundColor: "gray.50",
                },
              }}
            >
              <ListItemIcon>
                <Icon color={isSelected ? "blue.500" : undefined} />
              </ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}

export default connectAppContext(LeftDrawer);
