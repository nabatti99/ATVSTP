import { useEffect, useState } from "react";
import { Stack, Typography, Box, Paper, InputBase, IconButton, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";
import SendSvg from "components/Icons/SendSvg";
import StarBorderSvg from "components/Icons/StarBorderSvg";
import Notification from "components/Notification";
import useRequest from "hooks/useRequest";
import makeAvatarName from "utilities/makeAvatarName";

function PrivateNotificationDetail() {
  const request = useRequest();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [notificationData, setNotificationData] = useState({
    sender: "",
    title: "",
    receivers: [],
    messages: [],
  });

  useEffect(() => {
    setIsLoading(true);
    request.get(`notification/${id}`).then(({ data }) => {
      setNotificationData(data);
      setIsLoading(false);
    });
  }, [id]);

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
              <Notification label={makeAvatarName(from)}>
                <Stack>
                  <Typography variant="regular" color="gray.500" mb={1}>
                    {from}
                  </Typography>
                  <Typography variant="strong" color="gray.900" mb={2}>
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
              <InputBase multiline placeholder="Nội dung" color="gray.700" fullWidth rows={5} />

              <Box position="absolute" right={0} bottom={0} mb={2} mr={3}>
                <ButtonIcon variant="contained" LeftIcon={SendSvg}>
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

export default PrivateNotificationDetail;
