import { Stack, Typography, Box, Paper, InputBase, IconButton } from "@mui/material";
import ButtonIcon from "components/ButtonIcon";
import SendSvg from "components/Icons/SendSvg";

import StarBorderSvg from "components/Icons/StarBorderSvg";
import Notification from "components/Notification";

function PrivateNotificationDetail() {
  return (
    <Stack height="100%">
      <Box py={3} px={4} borderBottom={1} borderColor="gray.300">
        <Stack direction="row" flexWrap="wrap" alignItems="center" mb={2}>
          <Typography variant="h4" mr={1}>
            Thông báo họp tuần 32
          </Typography>

          <IconButton>
            <StarBorderSvg color="gray.500" />
          </IconButton>
        </Stack>

        <Typography variant="strong">
          Thông báo đến:&nbsp;
          <Box component="span" color="blue.500">
            Minh, Thịnh, Huyền
          </Box>
        </Typography>
      </Box>

      <Stack py={3} px={4} flexGrow={1} justifyContent="space-between">
        <Stack>
          <Notification label="LD">
            <Stack>
              <Typography variant="regular" color="gray.500" mb={1}>
                Lê Duy Dương
              </Typography>
              <Typography variant="strong" color="gray.900" mb={2}>
                21/03/2022
              </Typography>
              <Typography variant="regular" color="gray.500">
                Chào cả nhóm, tuần này mình sẽ họp ban lectus faucibus bibendum eget eget non facilisi sed. Quisque
                mauris cursus convallis ut consequat volutpat elit, enim. Egestas a bibendum condimentum ipsum sed
                volutpat sollicitudin et nunc. Nam nisi gravida amet, dolor porttitor tellus, urna, massa. Nunc non
                feugiat purus non lacus eget volutpat. Neque ac lacus sit volutpat praesent sit sagittis. Nam
                bibendum vel sapien aenean imperdiet malesuada. Turpis pretium ante neque, tortor facilisis
                faucibus magna. Purus cras tortor, lobortis imperdiet duis mi sagittis. Tincidunt mi, pulvinar diam
                in auctor lacus, nascetur et. Amet, nunc, in mi quis vulputate eu volutpat ut quis. Sit tellus nisl
                euismod arcu est amet. Et, amet, dictum arcu pellentesque nullam integer rutrum. Ac maecenas cras
                dui, turpis nulla. Egestas id leo gravida massa facilisi dapibus.
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

export default PrivateNotificationDetail;
