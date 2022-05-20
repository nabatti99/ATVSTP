import { Box, IconButton, List, ListItem, ListItemButton, Skeleton, Stack, Typography } from "@mui/material";
import ButtonIcon from "components/ButtonIcon";
import AddSvg from "components/Icons/AddSvg";
import useRequest from "hooks/useRequest";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import makeAvatarName from "utilities/makeAvatarName";
import makeTextEllipsis from "utilities/makeTextEllipsis";

const PrivateTab = ({ isShown = true }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const request = useRequest();

  const getAllPrivateNotifications = () => {
    setIsLoading(true);

    return request
      .get("notification", {
        params: {
          offset: 0,
          limit: 1000,
        },
      })
      .then(({ data }) => {
        setData(data.result);
        setIsLoading(false);
      });
  };

  const { state } = useLocation();
  useEffect(() => {
    getAllPrivateNotifications();
  }, []);

  useEffect(() => {
    if (state && state.isSubmitted) getAllPrivateNotifications();
  }, [state]);

  const navigate = useNavigate();

  const handleClicked = (_id) => {
    setCurrentId(_id);
    navigate(`/NotificationsManagement/Private/${_id}`);
  };

  const skeleton = (
    <ListItem disablePadding disableGutters divider>
      <Stack width="100%" direction="row" alignItems="center" spacing={2} px={2} py={2}>
        <Skeleton animation="wave" variant="circular" width={52} height={52} />

        <Stack flexGrow={1}>
          <Typography variant="regular" color="gray.500" mb={1} width="60%">
            <Skeleton animation="wave" />
          </Typography>
          <Typography variant="strong" color="gray.900" mb="2px" width="80%">
            <Skeleton animation="wave" />
          </Typography>
          <Typography variant="strong" color="gray.900" width="90%">
            <Skeleton animation="wave" />
          </Typography>
        </Stack>
      </Stack>
    </ListItem>
  );

  return (
    <Box height="100%" hidden={!isShown}>
      <Stack height="100%">
        <List disablePadding sx={{ flexGrow: 1 }}>
          {isLoading ? (
            <Fragment>
              {skeleton}
              {skeleton}
              {skeleton}
              {skeleton}
              {skeleton}
            </Fragment>
          ) : (
            data.map((notification) => {
              const rootMessage = notification.messages[0];

              return (
                <ListItem key={notification._id} disablePadding disableGutters divider>
                  <ListItemButton
                    disableGutters
                    sx={{
                      backgroundColor: currentId == notification._id ? "white" : "transparent",
                    }}
                    onClick={() => handleClicked(notification._id)}
                  >
                    <Stack
                      key={notification._id}
                      width="100%"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      px={2}
                      py={2}
                    >
                      <Stack
                        width={52}
                        height={52}
                        justifyContent="center"
                        alignItems="center"
                        bgcolor="blue.500"
                        borderRadius="50%"
                      >
                        <Typography variant="regular" fontSize="1.5rem" color="white">
                          {makeAvatarName(rootMessage.from)}
                        </Typography>
                      </Stack>

                      <Stack>
                        <Typography variant="regular" color="gray.500" mb={1}>
                          {rootMessage.from}
                        </Typography>
                        <Typography variant="strong" color="gray.900" mb="2px">
                          {notification.title}
                        </Typography>
                        <Typography variant="small" color="gray.500">
                          {makeTextEllipsis(rootMessage.message, 8)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </ListItemButton>
                </ListItem>
              );
            })
          )}
        </List>

        <Stack alignItems="stretch" marginBottom={1}>
          <ButtonIcon variant="text" LeftIcon={AddSvg} color="blue" onClick={() => navigate("NewMessage")}>
            Thêm mới
          </ButtonIcon>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PrivateTab;
