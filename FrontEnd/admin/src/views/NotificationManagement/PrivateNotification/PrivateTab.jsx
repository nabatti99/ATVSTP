import { Box, IconButton, List, ListItem, ListItemButton, Skeleton, Stack, Typography } from "@mui/material";
import AddSvg from "components/Icons/AddSvg";
import useRequest from "hooks/useRequest";
import { Fragment, useEffect, useState } from "react";

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

  useEffect(() => {
    setData([
      {
        _id: "ldd",
        title: "Thông báo họp tuần 32",
        receivers: ["Minh", "Thịnh", "Huyền"],
        messages: [
          {
            from: "Lê Duy Dương",
            message: `Chào cả nhóm, tuần này mình sẽ họp ban lectus faucibus bibendum eget eget non facilisi sed. Quisque
            mauris cursus convallis ut consequat volutpat elit, enim. Egestas a bibendum condimentum ipsum sed
            volutpat sollicitudin et nunc. Nam nisi gravida amet, dolor porttitor tellus, urna, massa. Nunc non
            feugiat purus non lacus eget volutpat. Neque ac lacus sit volutpat praesent sit sagittis. Nam
            bibendum vel sapien aenean imperdiet malesuada. Turpis pretium ante neque, tortor facilisis faucibus
            magna. Purus cras tortor, lobortis imperdiet duis mi sagittis. Tincidunt mi, pulvinar diam in auctor
            lacus, nascetur et. Amet, nunc, in mi quis vulputate eu volutpat ut quis. Sit tellus nisl euismod
            arcu est amet. Et, amet, dictum arcu pellentesque nullam integer rutrum. Ac maecenas cras dui, turpis
            nulla. Egestas id leo gravida massa facilisi dapibus.`,
          },
          {
            from: "Minh",
            message: `Tôi đã hiểu`,
          },
        ],
      },
      {
        _id: "adsoch",
        title: "Thông báo thanh tra",
        receivers: ["Minh"],
        messages: [
          {
            from: "Trương Công Nam",
            message: `Gửi Minh, tuần này có kế hoạch thanh tra tại Ac maecenas cras dui, turpis
            nulla. Egestas id leo gravida massa facilisi dapibus.`,
          },
          {
            from: "Minh",
            message: `Tôi đã hiểu`,
          },
        ],
      },
    ]);
    setCurrentId("ldd");
  }, []);

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
                    onClick={() => setCurrentId(notification._id)}
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

        <Stack alignItems="center" marginBottom={1}>
          <Box>
            <IconButton>
              <AddSvg />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PrivateTab;
