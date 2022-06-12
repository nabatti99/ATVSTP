import { Box, Button, debounce, MenuItem, Stack, TextField, Typography } from "@mui/material";
import useRequest from "hooks/useRequest";
import { useEffect, useRef, useState } from "react";
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
  onRoleChange = () => {},
  onAvatarChange = () => {},
  onOkButtonClick = () => {},
}) {
  const request = useRequest();
  const avatarFileRef = useRef();

  // Make event debounced
  const handleNameChangedDebounced = debounce(onNameChange, 1000);
  const handleEmailChangedDebounced = debounce(onEmailChange, 1000);
  const handlePhoneChangedDebounced = debounce(onPhoneChange, 1000);
  const handleAddressChangedDebounced = debounce(onAddressChange, 1000);

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

  // Handle Administrations
  const [availableAdministrations, setAvailableAdministrations] = useState([]);
  useEffect(() => {
    request
      .get("administration/read", {
        params: {
          offset: 0,
          limit: 1000,
        },
      })
      .then((res) => {
        setAvailableAdministrations(res.data.data);
      });
  }, []);

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

  const { avatar, name, email, type_manager, phone, address, work_from, role, image_url } = profileData;
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
          label="LÀM VIỆC TẠI"
          select
          variant="standard"
          sx={{ marginBottom: 4 }}
          onChange={(event) => onAddressWorkFromChange(event.target.value)}
          value={work_from}
        >
          {availableAdministrations.map(({ name }) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="CHỨC VỤ"
          select
          variant="standard"
          sx={{ marginBottom: 4 }}
          onChange={(event) => onRoleChange(event.target.value)}
          value={role}
        >
          {["Giám đốc", "Phó giám đốc", "Thanh tra viên"].map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
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
