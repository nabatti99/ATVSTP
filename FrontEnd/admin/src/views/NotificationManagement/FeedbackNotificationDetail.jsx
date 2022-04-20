import { Stack, Typography, Box, Paper, InputBase, IconButton, Skeleton } from "@mui/material";
import ButtonIcon from "components/ButtonIcon";
import MailSvg from "components/Icons/MailSvg";
import PhoneSvg from "components/Icons/PhoneSvg";
import SendSvg from "components/Icons/SendSvg";

import StarBorderSvg from "components/Icons/StarBorderSvg";
import Notification from "components/Notification";
import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    setIsLoading(true);
    request.get(`feedback/read/${id}`).then(({ data }) => {
      setFeedbackData(data);
      setIsLoading(false);
    });
  }, [id]);

  const skeleton = <Skeleton animation="wave" sx={{ minWidth: "200px" }} />;

  const { content, create_at, department, email, fullname, phone_number } = feedbackData;

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
          <MailSvg size={16} mr={1} />
          <Typography variant="strong">
            Email:&nbsp;
            <Box component="span" color="blue.500">
              {isLoading ? skeleton : email}
            </Box>
          </Typography>
        </Stack>

        <Stack direction="row" mt={1}>
          <PhoneSvg size={16} mr={1} />
          <Typography variant="strong">
            Số điện thoại:&nbsp;
            <Box component="span" color="blue.500">
              {isLoading ? skeleton : phone_number}
            </Box>
          </Typography>
        </Stack>
      </Box>

      <Stack py={3} px={4} flexGrow={1} justifyContent="space-between">
        <Stack>
          <Notification label={makeAvatarName(fullname)}>
            <Stack>
              <Typography variant="regular" color="gray.500" mb={1}>
                {isLoading ? skeleton : fullname}
              </Typography>
              <Typography variant="strong" color="gray.900" mb={2}>
                {isLoading ? skeleton : create_at}
              </Typography>
              <Typography variant="regular" color="gray.500">
                {isLoading ? skeleton : content}
              </Typography>
            </Stack>
          </Notification>
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

export default FeedbackNotificationDetail;
