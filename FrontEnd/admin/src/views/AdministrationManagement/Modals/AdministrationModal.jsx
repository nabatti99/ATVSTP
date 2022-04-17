import { Box, Button, debounce, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import AddSvg from "components/Icons/AddSvg";
import { useRef, useState } from "react";
import AppModal from "../../../components/AppModal";
import { ADD_NEW_ADMINISTRATION, EDIT_ADMINISTRATION } from "./administrationActionTypes";

function AdministrationModal({
  isModalOpened = true,
  administrationData = {},
  modalType,
  onCLoseButtonClick = () => {},
  onModalClose = () => {},
  onNameChange = () => {},
  onPhoneChange = () => {},
  onResponsibleChange = () => {},
  onOkButtonClick = () => {},
}) {
  // Make event debounced
  const handleNameChangedDebounced = debounce(onNameChange, 1000);
  const handlePhoneChangedDebounced = debounce(onPhoneChange, 1000);

  // Get all administrations info
  const { name, phone_number, responsible } = administrationData;

  // Handle Responsible
  const handleResponsibleChanged = (name, member) => {
    responsible[name] = member;
    onResponsibleChange({ ...responsible });
  };

  // Handle Events
  const renderInfo = {
    title: "",
  };

  switch (modalType) {
    case ADD_NEW_ADMINISTRATION:
      renderInfo.title = "Thêm tổ chức thanh tra mới";
      break;

    case EDIT_ADMINISTRATION:
      renderInfo.title = "Chỉnh sửa tổ chức thanh tra";
      break;

    default:
      throw new Error("Lệnh không đúng");
  }

  return (
    <AppModal
      isOpened={isModalOpened}
      title={renderInfo.title}
      onCLoseButtonClick={onCLoseButtonClick}
      onModalClose={onModalClose}
    >
      <Stack>
        <TextField
          label="TÊN TỔ CHỨC"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleNameChangedDebounced(event.target.value)}
          defaultValue={name}
        />
        <TextField
          label="SĐT LIÊN LẠC"
          variant="standard"
          sx={{ marginBottom: 4 }}
          onChange={(event) => handlePhoneChangedDebounced(event.target.value)}
          defaultValue={phone_number}
        />

        <Typography variant="strong" mb={2} color="gray.700">
          CHỨC VỤ TRONG TỔ CHỨC
        </Typography>

        {Object.keys(responsible).map((key) => (
          <Stack key={key} direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="strong" flexBasis="25%" color="gray.700">
              {key}:
            </Typography>
            <TextField
              label="CÁC THÀNH VIÊN"
              variant="standard"
              sx={{ flexBasis: "75%" }}
              defaultValue={responsible[key].join(", ")}
              onChange={(event) =>
                handleResponsibleChanged(
                  key,
                  event.target.value.split(",").map((email) => email.trim())
                )
              }
            />
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={4}>
        <Button variant="outlined" onClick={onOkButtonClick}>
          Hoàn thành
        </Button>
      </Stack>
    </AppModal>
  );
}

export default AdministrationModal;
