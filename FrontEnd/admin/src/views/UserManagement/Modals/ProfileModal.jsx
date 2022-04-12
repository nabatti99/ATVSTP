import { Box, Button, debounce, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import AppModal from "../../../components/AppModal";
import Image from "../../../components/Image";
import { ADD_NEW_PROFILE, EDIT_PROFILE } from "./profileActionTypes";

function ProfileModal({
  isModalOpened = true,
  profileData = {},
  modalType,
  onCLoseButtonClick = () => {},
  onModalClose = () => {},
  onNameChange = () => {},
  onEmailChange = () => {},
  onTypeManagerChange = () => {},
  onPhoneChange = () => {},
  onAddressChange = () => {},
  onAddressWorkFromChange = () => {},
  onAvatarChange = () => {},
  onOkButtonClick = () => {},
}) {
  const avatarFileRef = useRef();

  // Make event debounced
  const handleNameChangedDebounced = debounce(onNameChange, 1000);
  const handleEmailChangedDebounced = debounce(onEmailChange, 1000);
  const handlePhoneChangedDebounced = debounce(onPhoneChange, 1000);
  const handleAddressChangedDebounced = debounce(onAddressChange, 1000);
  const handleAddressWorkFromChangedDebounced = debounce(onAddressWorkFromChange, 1000);

  // Handle Events
  function handleChooseFileButtonClicked() {
    avatarFileRef.current.click();
  }

  function handleOnFileChanged(event) {
    const { files } = event.target;
    if (files.length === 0) {
      return;
    }

    onAvatarChange(files[0]);
    console.log(files[0]);
  }

  const renderInfo = {
    title: "",
    shouldEnableEmail: true,
  };

  switch (modalType) {
    case ADD_NEW_PROFILE:
      renderInfo.title = "Thêm mới người dùng";
      break;

    case EDIT_PROFILE:
      renderInfo.title = "Chỉnh sửa thông tin người dùng";
      renderInfo.shouldEnableEmail = false;
      break;

    default:
      throw new Error("Lệnh không đúng");
  }

  const { avatar, name, email, type_manager, phone, address, work_from, image_url } = profileData;
  const imageSrc = (avatar && URL.createObjectURL(avatar)) || image_url;

  return (
    <AppModal
      isOpened={isModalOpened}
      title={renderInfo.title}
      onCLoseButtonClick={onCLoseButtonClick}
      onModalClose={onModalClose}
    >
      <Stack>
        <TextField
          label="HỌ VÀ TÊN"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleNameChangedDebounced(event.target.value)}
          defaultValue={name}
        />
        <TextField
          label="EMAIL"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleEmailChangedDebounced(event.target.value)}
          disabled={!renderInfo.shouldEnableEmail}
          defaultValue={email}
        />
        <TextField
          variant="standard"
          select
          value={type_manager}
          onChange={(event) => onTypeManagerChange(event.target.value)}
          label="VAI TRÒ"
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="inspector">Thanh tra viên</MenuItem>
        </TextField>
        <TextField
          label="SỐ ĐIỆN THOẠI"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handlePhoneChangedDebounced(event.target.value)}
          defaultValue={phone}
        />
        <TextField
          label="ĐỊA CHỈ"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleAddressChangedDebounced(event.target.value)}
          defaultValue={address}
        />
        <TextField
          label="ĐỊA CHỈ LÀM VIỆC"
          variant="standard"
          sx={{ marginBottom: 4 }}
          onChange={(event) => handleAddressWorkFromChangedDebounced(event.target.value)}
          defaultValue={work_from}
        />
        <Stack>
          <Typography variant="strong" color="gray.500">
            AVATAR
          </Typography>

          {imageSrc && <Image src={imageSrc} borderRadius={2} width={100} height={100} mt={1} />}

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
              ref={avatarFileRef}
            />
          </Box>
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
