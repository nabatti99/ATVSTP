import { useEffect, useRef, useState } from "react";
import { Stack, Typography, Box, Paper, InputBase, IconButton, Skeleton, debounce } from "@mui/material";
import { useParams } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";
import SendSvg from "components/Icons/SendSvg";
import StarBorderSvg from "components/Icons/StarBorderSvg";
import Notification from "components/Notification";
import useRequest from "hooks/useRequest";
import makeAvatarName from "utilities/makeAvatarName";
import { connectAppContext } from "contexts/appContext/appContext";

function PrivateNotificationDetail({ appContext }) {
  const request = useRequest();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [notificationData, setNotificationData] = useState({
    sender: "",
    title: "",
    receivers: [],
    messages: [],
  });

  const loadData = () => {
    setIsLoading(true);
    request
      .get(`notification/${id}`)
      .then(({ data }) => setNotificationData(data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => loadData(), [id]);

  const [responseData, setResponseData] = useState({
    message: "",
    from: appContext.userEmail,
  });

  const handleResponseMessageChanged = (message) => {
    setResponseData({
      ...responseData,
      message,
    });
  };

  const messageBoxRef = useRef();
  const handleSubmitButtonClicked = () => {
    request.put(`notification/${id}`, responseData).finally(() => {
      loadData();
      messageBoxRef.current.value = "";
    });
  };

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;
  const iconSkeleton = <Skeleton variant="circular" animation="wave" width={16} height={16} />;

  const { sender = "", title = "", receivers = [], messages = [] } = notificationData;

  return (
    <Stack height="100%">
      <Box py={3} px={4} borderBottom={1} borderColor="gray.300">
        <Stack direction="row" flexWrap="wrap" alignItems="center" mb={2}>
          <Typography variant="h4" mr={1}>
            {isLoading ? skeleton : title}
          </Typography>

          <IconButton>
            <StarBorderSvg color="gray.500" />
          </IconButton>
        </Stack>

        <Typography variant="strong">
          Thông báo đến:&nbsp;
          <Box component="span" color="blue.500">
            {isLoading ? skeleton : receivers.join(", ")}
          </Box>
        </Typography>
      </Box>

      <Stack py={3} px={4} flexGrow={1} justifyContent="space-between">
        <Stack>
          {isLoading ? (
            <Notification isLoading={isLoading}>
              <Stack>
                <Typography variant="regular" color="gray.500" mb={1}>
                  {skeleton}
                </Typography>
                <Typography variant="strong" color="gray.900" mb={2}>
                  {skeleton}
                </Typography>
                <Typography variant="regular" color="gray.500">
                  {skeleton}
                </Typography>
              </Stack>
            </Notification>
          ) : (
            messages.map(({ from, message, time }) => (
              <Notification key={message} label={makeAvatarName(from)} mb={2}>
                <Stack>
                  <Typography variant="regular" color="gray.500" mb={1}>
                    {from}
                  </Typography>
                  <Typography variant="strong" color="gray.900" mb={1}>
                    {time}
                  </Typography>
                  <Typography variant="regular" color="gray.500">
                    {message}
                  </Typography>
                </Stack>
              </Notification>
            ))
          )}
        </Stack>

        <Paper variant="outlined">
          <Stack height="100%">
            <Typography variant="strong" color="gray.500" borderBottom={1} borderColor="gray.300" px={3} py={2}>
              Phản hồi
            </Typography>

            <Box px={3} py={2} flexGrow={1} position="relative">
              <InputBase
                ref={messageBoxRef}
                multiline
                placeholder="Nội dung"
                color="gray.700"
                fullWidth
                rows={5}
                onChange={debounce((event) => handleResponseMessageChanged(event.target.value), 1000)}
              />

              <Box position="absolute" right={0} bottom={0} mb={2} mr={3}>
                <ButtonIcon variant="contained" LeftIcon={SendSvg} onClick={handleSubmitButtonClicked}>
                  GỬI
                </ButtonIcon>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default connectAppContext(PrivateNotificationDetail);
