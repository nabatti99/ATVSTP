import { Stack, Typography, Tabs, Tab, Paper, List, ListItem, ListItemButton } from "@mui/material";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import makeAvatarName from "utilities/makeAvatarName";
import makeTextEllipsis from "utilities/makeTextEllipsis";

function NotificationTab({ data = [] }) {
  const tabs = data.map((_data) => _data.tab);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChanged = (tabValue) => {
    setTabValue(tabValue);
  };

  const { id } = useParams();

  const navigate = useNavigate();
  const handlePrivateNotificationClicked = (id) => {
    navigate(`Private/${id}`);
  };

  const handleFeedbackNotificationClicked = (id) => {
    navigate(`Feedback/${id}`);
  };

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        value={tabValue}
        onChange={(event, tabValue) => handleTabChanged(tabValue)}
        sx={{
          borderBottom: 1,
          borderColor: "gray.300",
        }}
      >
        {tabs.map((tab) => (
          <Tab label={tab} key={tab} />
        ))}
      </Tabs>

      <List disablePadding>
        {tabValue == 0 &&
          data[0].notifications.map((notification) => {
            const rootMessage = notification.messages[0];

            return (
              <ListItem disablePadding disableGutters divider>
                <ListItemButton
                  disableGutters
                  sx={{
                    backgroundColor: id == notification.id ? "white" : "transparent",
                  }}
                  onClick={() => handlePrivateNotificationClicked(notification.id)}
                >
                  <Stack
                    key={notification.id}
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
          })}
      </List>

      {tabValue == 1 &&
        data[1].notifications.map(({ _id, content, create_at, department, email, fullname, phone_number }) => {
          return (
            <ListItem disablePadding disableGutters divider>
              <ListItemButton
                disableGutters
                sx={{
                  backgroundColor: id == _id ? "white" : "transparent",
                }}
                onClick={() => handleFeedbackNotificationClicked(_id)}
              >
                <Stack key={_id} width="100%" direction="row" alignItems="center" spacing={2} px={2} py={2}>
                  <Stack
                    width={52}
                    height={52}
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="blue.500"
                    borderRadius="50%"
                  >
                    <Typography variant="regular" fontSize="1.5rem" color="white">
                      {makeAvatarName(fullname)}
                    </Typography>
                  </Stack>

                  <Stack>
                    <Typography variant="regular" color="gray.500" mb={1}>
                      {email}
                    </Typography>
                    <Typography variant="strong" color="gray.900" mb="2px">
                      {makeTextEllipsis(content, 6)}
                    </Typography>
                  </Stack>
                </Stack>
              </ListItemButton>
            </ListItem>
          );
        })}
    </Fragment>
  );
}

export default NotificationTab;
