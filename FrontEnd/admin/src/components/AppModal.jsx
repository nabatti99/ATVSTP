import { Backdrop, Fade, IconButton, Modal, Paper, Stack, Typography } from "@mui/material";
import CloseSvg from "./Icons/CloseSvg";

function AppModal({ isOpened = true, title, onCLoseButtonClick, onModalClose, children }) {
  return (
    <Modal
      open={isOpened}
      onClose={onCLoseButtonClick}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        transitionDuration: 240,
      }}
    >
      <Fade in={isOpened} onExited={onModalClose}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: "80%",
            maxHeight: "80vh",
            overflow: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 4,
            borderRadius: 4,
          }}
        >
          <Stack direction="row" alignItems="center" mb={4}>
            <Typography variant="h3" mr={4} color="gray.700" flexGrow={1}>
              {title}
            </Typography>
            <IconButton onClick={onCLoseButtonClick}>
              <CloseSvg color="gray.700" size={32} />
            </IconButton>
          </Stack>

          {children}
        </Paper>
      </Fade>
    </Modal>
  );
}

export default AppModal;
