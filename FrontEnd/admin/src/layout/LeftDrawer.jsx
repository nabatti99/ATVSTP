import { Drawer, Link, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

import { connectAppContext } from "../contexts/appContext/appContext";
import LeaderBoardSvg from "../components/Icons/LeaderBoardSvg";
import GroupSvg from "../components/Icons/GroupSvg";
import LocalMallSvg from "../components/Icons/LocalMallSvg";
import AssignmentTurnedInSvg from "../components/Icons/AssignmentTurnedInSvg";
import EventNoteSvg from "components/Icons/EventNoteSvg";
import ApartmentSvg from "components/Icons/ApartmentSvg";
import MarkChatUnreadSvg from "components/Icons/MarkChatUnreadSvg";
import AssignmentSvg from "components/Icons/AssignmentSvg";

function LeftDrawer({ appContext }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { drawerWidth } = appContext;

  const navItems = [
    {
      Icon: LeaderBoardSvg,
      path: "/",
      text: "Thống kê",
    },
    {
      Icon: GroupSvg,
      path: "/UsersManagement/",
      text: "Nhân sự",
    },
    {
      Icon: ApartmentSvg,
      path: "/AdministrationsManagement/",
      text: "Tổ chức thanh tra",
    },
    {
      Icon: LocalMallSvg,
      path: "/GroceriesManagement/",
      text: "Cửa hàng",
    },
    {
      Icon: AssignmentSvg,
      path: "/PostsManagement/",
      text: "Bài đăng",
    },
    {
      Icon: AssignmentTurnedInSvg,
      path: "/CertificatesManagement/",
      text: "Chứng nhận",
    },
    {
      Icon: EventNoteSvg,
      path: "/InspectionSchedulesManagement/",
      text: "Kế hoạch thanh tra",
    },
    {
      Icon: MarkChatUnreadSvg,
      path: "/NotificationsManagement/",
      text: "Thông báo, phản hồi",
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
        <Link href="/" underline="none">
          <Stack direction="row" alignItems="center">
            <LeaderBoardSvg mr={1} size={32} color="gray.900" />
            <Typography variant="h5" sx={{ fontWeight: 900 }} color="gray.900">
              ATVSTP - Admin
            </Typography>
          </Stack>
        </Link>
      </Stack>

      <List>
        {navItems.map(({ Icon, path, text }) => {
          const isSelected = location.pathname === path;
          const color = isSelected ? "blue.500" : "gray.500";

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
                <Icon color={color} />
              </ListItemIcon>
              <ListItemText sx={{ color }}>{text}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}

export default connectAppContext(LeftDrawer);
