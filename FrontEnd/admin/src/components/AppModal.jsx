import { Backdrop, Button, Fade, IconButton, Modal, Paper, Stack, Typography } from "@mui/material";
import LeaderBoardSvg from "./Icons/LeaderBoardSvg";

function AppModal({ isOpened = true, onCLoseButtonClicked, children }) {
  return (
    <Modal
      open={isOpened}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        transitionDuration: 240,
      }}
    >
      <Fade in={isOpened}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: "80%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 4,
          }}
        >
          <Stack direction="row" alignItems="center" mb={4}>
            <Typography variant="h3" mr={4}>
              Chỉnh sửa thông tin cá nhân
            </Typography>
            <IconButton onClick={onCLoseButtonClicked}>
              <LeaderBoardSvg color="gray.900" size={32} />
            </IconButton>
          </Stack>

          {children}
        </Paper>
      </Fade>
    </Modal>
  );
}

export default AppModal;
