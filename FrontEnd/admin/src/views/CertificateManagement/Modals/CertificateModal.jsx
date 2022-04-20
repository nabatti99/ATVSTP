import { Box, Button, debounce, MenuItem, Stack, TextField, Typography } from "@mui/material";
import useRequest from "hooks/useRequest";
import { useEffect, useRef, useState } from "react";
import AppModal from "../../../components/AppModal";
import Image from "../../../components/Image";
import { ADD_NEW_CERTIFICATE, EDIT_CERTIFICATE } from "./certificateActionTypes";

function CertificateModal({
  isModalOpened = true,
  certificateData = {},
  modalType,
  onCLoseButtonClick = () => {},
  onModalClose = () => {},
  onNameChange = () => {},
  onManagerChange = () => {},
  onEffectiveTimeChange = () => {},
  onAvatarChange = () => {},
  onOkButtonClick = () => {},
}) {
  const request = useRequest();
  const avatarFileRef = useRef();

  // Make event debounced
  const handleNameChangedDebounced = debounce(onNameChange, 1000);
  const handleEffectiveTimeChangedDebounced = debounce(onEffectiveTimeChange, 1000);

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

  const renderInfo = {
    title: "",
    shouldEnableName: true,
  };

  switch (modalType) {
    case ADD_NEW_CERTIFICATE:
      renderInfo.title = "Thêm chứng nhận mới";
      break;

    case EDIT_CERTIFICATE:
      renderInfo.title = "Chỉnh sửa chứng nhận";
      renderInfo.shouldEnableName = false;
      break;

    default:
      throw new Error("Lệnh không đúng");
  }

  const { avatar, image_url, name, manager, effective_time } = certificateData;
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
          label="TÊN GIẤY CHỨNG NHẬN"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleNameChangedDebounced(event.target.value)}
          defaultValue={name}
          disabled={!renderInfo.shouldEnableName}
        />
        <TextField
          label="ĐƠN VỊ PHÁT HÀNH"
          variant="standard"
          select
          sx={{ marginBottom: 2 }}
          onChange={(event) => onManagerChange(event.target.value)}
          value={manager}
        >
          {availableAdministrations.map(({ name }) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="THỜI GIAN HIỆU LỰC (THÁNG)"
          variant="standard"
          type="number"
          sx={{ marginBottom: 4 }}
          onChange={(event) => handleEffectiveTimeChangedDebounced(event.target.value)}
          defaultValue={effective_time}
        />
        <Stack>
          <Typography variant="strong" color="gray.500">
            ẢNH MINH HOẠ
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

export default CertificateModal;
