import { Box, Button, debounce, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import AppModal from "../../../components/AppModal";
import Image from "../../../components/Image";

function ProfileModal({
  isModalOpened = true,
  title,
  onCLoseButtonClick,
  onModalClose,
  onNameTextChange,
  onEmailTextChange,
  onPhoneTextChange,
  onLocationChange,
  onOkButtonClick,
  avatarSrc,
}) {
  const fileRef = useRef();
  const [file, setFile] = useState(null);

  function handleChooseFileButtonClicked() {
    fileRef.current.click();
  }

  function handleOnFileChanged(event) {
    const { files } = event.target;
    if (files.length === 0) {
      setFile(null);
      return;
    }

    setFile(files[0]);
    console.log(files[0]);
  }

  return (
    <AppModal
      isOpened={isModalOpened}
      title={title}
      onCLoseButtonClick={onCLoseButtonClick}
      onModalClose={onModalClose}
    >
      <Stack>
        <TextField
          label="HỌ VÀ TÊN"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={debounce(onNameTextChange, 1000)}
        />
        <TextField
          label="EMAIL"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={debounce(onEmailTextChange, 1000)}
        />
        <TextField
          label="SỐ ĐIỆN THOẠI"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={debounce(onPhoneTextChange, 1000)}
        />
        <TextField
          label="ĐỊA CHỈ"
          variant="standard"
          sx={{ marginBottom: 4 }}
          onChange={debounce(onLocationChange, 1000)}
        />
        <Stack>
          <Typography variant="strong" color="gray.500">
            AVATAR
          </Typography>

          {avatarSrc && <Image src={avatarSrc} borderRadius={2} width={100} height={100} mt={1} />}

          <Box mt={1}>
            <Button variant="contained" color="blue" onClick={handleChooseFileButtonClicked}>
              Chọn file
            </Button>
            <Box
              component="input"
              type="file"
              accept="image/*"
              hidden
              onChange={handleOnFileChanged}
              ref={fileRef}
            />
          </Box>

          {file && (
            <Typography variant="small" mt={1} color="gray.700">
              {file.name}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={4}>
        <Button variant="outlined" onClick={onOkButtonClick}>
          Hoàn thành
        </Button>
      </Stack>
    </AppModal>
  );
}

export default ProfileModal;
