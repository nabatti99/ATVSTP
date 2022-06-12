import { AppBar, Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import NotificationsSvg from "../components/Icons/NotificationsSvg";

import { connectAppContext } from "../contexts/appContext/appContext";
import { deleteAccessToken } from "../contexts/appContext/appActions";
import ReplaySvg from "components/Icons/ReplaySvg";

function Main({ appContext, dispatch, children }) {
  const { drawerWidth } = appContext;

  const navigate = useNavigate();
  const request = useRequest();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image_url: "",
  });
  useEffect(() => {
    request.get(`manager/get_a_manager/${appContext.userEmail}`).then(({ data }) => setUserData(data));
  }, []);

  const handleLogout = () => dispatch(deleteAccessToken());
  const handleAvatarClicked = () => navigate(`/UserDetail/${email}`);

  const { name, email, image_url } = userData;

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
              <IconButton onClick={handleLogout}>
                <ReplaySvg />
              </IconButton>
              <IconButton>
                <NotificationsSvg />
              </IconButton>
            </Box>
            <Typography variant="strong" mr={2}>
              Xin chào,&nbsp;{name}
            </Typography>
            {image_url && <Avatar src={image_url} sx={{ width: 40, height: 40, cursor: "pointer" }} border={2} borderColor="blue.500" onClick={handleAvatarClicked} />}
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
