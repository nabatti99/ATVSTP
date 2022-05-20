import { Fragment, useEffect, useState } from "react";
import { List, ListItem, ListItemButton, Skeleton, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import makeAvatarName from "utilities/makeAvatarName";
import makeTextEllipsis from "utilities/makeTextEllipsis";
import { useNavigate } from "react-router-dom";
import { connectAppContext } from "contexts/appContext/appContext";

const FeedbackTab = ({ isShown = true, appContext }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const request = useRequest();

  const getAllFeedbacks = async () => {
    setIsLoading(true);
    return request
      .get("feedback/read", {
        params: {
          offset: 0,
          limit: 1000,
          department: "624518c4b6316a92e74b4015", // Need to fix API
          value: "",
        },
      })
      .then(({ data }) => {
        setData(data.Message);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllFeedbacks().then(() => {
      setIsLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const handleClicked = (_id) => {
    setCurrentId(_id);
    navigate(`/NotificationsManagement/Feedback/${_id}`);
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
        </Stack>
      </Stack>
    </ListItem>
  );

  return (
    <List disablePadding hidden={!isShown}>
      {isLoading ? (
        <Fragment>
          {skeleton}
          {skeleton}
          {skeleton}
          {skeleton}
          {skeleton}
        </Fragment>
      ) : (
        data.map(({ _id, content, create_at, department, email, fullname, phone_number }) => {
          return (
            <ListItem disablePadding disableGutters divider>
              <ListItemButton
                disableGutters
                sx={{
                  backgroundColor: currentId == _id ? "white" : "transparent",
                }}
                onClick={() => handleClicked(_id)}
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
        })
      )}
    </List>
  );
};

export default connectAppContext(FeedbackTab);
