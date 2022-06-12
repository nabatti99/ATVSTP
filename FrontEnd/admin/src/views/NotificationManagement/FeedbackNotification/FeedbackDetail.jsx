import { Stack, Typography, Box, Paper, InputBase, IconButton, Skeleton, debounce } from "@mui/material";
import ButtonIcon from "components/ButtonIcon";
import MailSvg from "components/Icons/MailSvg";
import PhoneSvg from "components/Icons/PhoneSvg";
import SendSvg from "components/Icons/SendSvg";

import StarBorderSvg from "components/Icons/StarBorderSvg";
import Notification from "components/Notification";
import useRequest from "hooks/useRequest";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import makeAvatarName from "utilities/makeAvatarName";

function FeedbackNotificationDetail() {
  const request = useRequest();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState({
    content: "",
    create_at: "",
    department: "",
    email: "",
    fullname: "",
    phone_number: "",
  });

  const loadData = () => {
    setIsLoading(true);
    request
      .get(`feedback/read/${id}`)
      .then(({ data }) => setFeedbackData(data))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => loadData(), [id]);

  const [message, setMessage] = useState("");
  const handleSubmitButtonClicked = () => {
    request
      .post(`feedback/response_feedback_from_manager/${id}`, {
        message,
      })
      .finally(() => {
        loadData();
        setMessage("");
      });
  };

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;
  const iconSkeleton = <Skeleton variant="circular" animation="wave" width={16} height={16} />;

  const { content, create_at, email, fullname, phone_number } = feedbackData;

  const requestContent = content[0];
  const responseContent = content[1];

  return (
    <Stack height="100%">
      <Box py={3} px={4} borderBottom={1} borderColor="gray.300">
        <Stack direction="row" flexWrap="wrap" alignItems="center" mb={2}>
          <Typography variant="h4" mr={1}>
            {isLoading ? skeleton : fullname}
          </Typography>

          <IconButton>
            <StarBorderSvg color="gray.500" />
          </IconButton>
        </Stack>

        <Stack direction="row" mt={1}>
          {isLoading ? iconSkeleton : <MailSvg size={16} />}

          <Typography variant="strong" ml={1}>
            {isLoading ? (
              skeleton
            ) : (
              <Fragment>
                Email:&nbsp;
                <Box component="span" color="blue.500">
                  {isLoading ? skeleton : email}
                </Box>
              </Fragment>
            )}
          </Typography>
        </Stack>

        <Stack direction="row" mt={1}>
          {isLoading ? iconSkeleton : <PhoneSvg size={16} />}
          <Typography variant="strong" ml={1}>
            {isLoading ? (
              skeleton
            ) : (
              <Fragment>
                Số điện thoại:&nbsp;
                <Box component="span" color="blue.500">
                  {phone_number}
                </Box>
              </Fragment>
            )}
          </Typography>
        </Stack>

        <Stack direction="row" mt={1}>
          {isLoading ? iconSkeleton : <SendSvg size={16} />}
          <Typography variant="strong" ml={1}>
            {isLoading ? (
              skeleton
            ) : (
              <Fragment>
                Ngày gửi:&nbsp;
                <Box component="span" color="blue.500">
                  {isLoading ? skeleton : create_at}
                </Box>
              </Fragment>
            )}
          </Typography>
        </Stack>
      </Box>

      <Stack py={3} px={4} flexGrow={1} justifyContent="space-between">
        <Stack>
          <Notification label={makeAvatarName(fullname)} isLoading={isLoading}>
            <Stack>
              <Typography variant="regular" color="gray.500" mb={1}>
                {isLoading ? skeleton : fullname}
              </Typography>
              <Typography variant="regular" color="gray.700">
                {isLoading ? skeleton : requestContent.message}
              </Typography>
            </Stack>
          </Notification>

          {responseContent && (
            <Notification
              label={makeAvatarName(isLoading ? "" : responseContent.sender)}
              isLoading={isLoading}
              mt={2}
            >
              <Stack>
                <Typography variant="regular" color="gray.500" mb={1}>
                  {isLoading ? skeleton : responseContent.sender}
                </Typography>
                <Typography variant="regular" color="gray.700">
                  {isLoading ? skeleton : responseContent.message}
                </Typography>
              </Stack>
            </Notification>
          )}
        </Stack>

        {!responseContent && (
          <Paper variant="outlined">
            <Stack height="100%">
              <Typography variant="strong" color="gray.500" borderBottom={1} borderColor="gray.300" px={3} py={2}>
                Phản hồi
              </Typography>

              <Box px={3} py={2} flexGrow={1} position="relative">
                <InputBase
                  multiline
                  placeholder="Nội dung"
                  color="gray.700"
                  fullWidth
                  rows={5}
                  onChange={debounce((event) => setMessage(event.target.value), 1000)}
                />

                <Box position="absolute" right={0} bottom={0} mb={2} mr={3}>
                  <ButtonIcon variant="contained" LeftIcon={SendSvg} onClick={handleSubmitButtonClicked}>
                    GỬI
                  </ButtonIcon>
                </Box>
              </Box>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Stack>
  );
}

export default FeedbackNotificationDetail;
