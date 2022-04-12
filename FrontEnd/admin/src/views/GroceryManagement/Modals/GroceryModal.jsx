import { Box, Button, debounce, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import useRequest from "../../../hooks/useRequest";
import AppModal from "../../../components/AppModal";
import AddSvg from "../../../components/Icons/AddSvg";
import Image from "../../../components/Image";
import { ADD_NEW_GROCERY, EDIT_GROCERY } from "./groceryActionTypes";

function GroceryModal({
  isModalOpened = true,
  groceryData = {},
  modalType,
  onCLoseButtonClick = () => {},
  onModalClose = () => {},
  onNameChange = () => {},
  onAddressChange = () => {},
  onStatusChange = () => {},
  onOwnerChange = () => {},
  onPhoneNumberChange = () => {},
  onItemsChange = () => {},
  onCertificatesChange = () => {},
  onAvatarChange = () => {},
  onOkButtonClick = () => {},
}) {
  const request = useRequest();
  const avatarFileRef = useRef();

  // Make event debounced
  const handleNameChangedDebounced = debounce(onNameChange, 1000);
  const handleAddressChangedDebounced = debounce(onAddressChange, 1000);
  const handleOwnerChangedDebounced = debounce(onOwnerChange, 1000);
  const handlePhoneNumberChangedDebounced = debounce(onPhoneNumberChange, 1000);

  // Get all grocery info
  const { name, owner, phone_number, address, status, item, certificate, image_url, avatar } = groceryData;

  // Handle Items
  const createNewItem = (name = "", is_allowed = true) => ({
    name,
    is_allowed,
  });

  const handleAddItemButtonClicked = () => {
    onItemsChange([...item, createNewItem()]);
  };

  const handleItemChanged = (index, name, is_allowed) => {
    item[index] = createNewItem(name, is_allowed);
    onItemsChange([...item]);
  };

  const handleItemChangedDebounced = debounce(handleItemChanged, 1000);

  // Handle Certificates
  const [availableCertificates, setAvailableCertificates] = useState([]);
  useEffect(() => {
    request
      .get("certificate", {
        params: {
          offset: 0,
          limit: 1000,
          value: "",
        },
      })
      .then((res) => {
        setAvailableCertificates(res.data.result);
      });
  }, []);

  const createNewCertificate = (name = "", date = "01/01/2022") => ({
    name,
    date,
  });

  const handleAddCertificateButtonClicked = () => {
    onCertificatesChange([...certificate, createNewCertificate()]);
  };

  const handleCertificateChanged = (index, name, is_allowed) => {
    certificate[index] = createNewCertificate(name, is_allowed);
    onCertificatesChange([...certificate]);
  };

  // Handle Image File
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
    shouldEnableName: true,
  };

  switch (modalType) {
    case ADD_NEW_GROCERY:
      renderInfo.title = "Thêm thông tin cửa hàng\nsản xuất và kinh doanh thực phẩm mới";
      break;

    case EDIT_GROCERY:
      renderInfo.title = "Chỉnh sửa thông tin cửa hàng\nsản xuất và kinh doanh thực phẩm";
      renderInfo.shouldEnableName = false;
      break;

    default:
      throw new Error("Lệnh không đúng");
  }

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
          label="TÊN CỬA HÀNG"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleNameChangedDebounced(event.target.value)}
          defaultValue={name}
          disabled={!renderInfo.shouldEnableName}
        />
        <TextField
          label="ĐỊA CHỈ"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleAddressChangedDebounced(event.target.value)}
          defaultValue={address}
        />
        <TextField
          label="TÌNH TRẠNG HOẠT ĐỘNG"
          select
          variant="standard"
          sx={{ marginBottom: 4 }}
          onChange={(event) => onStatusChange(event.target.value)}
          value={status}
        >
          <MenuItem value="active">Đang hoạt động</MenuItem>
          <MenuItem value="inactive">Không hoạt động</MenuItem>
        </TextField>

        <Typography variant="strong" mb={2} color="gray.700">
          THÔNG TIN LIÊN HỆ
        </Typography>
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <TextField
            label="CHỦ CỬA HÀNG"
            variant="standard"
            sx={{ flexBasis: "49%" }}
            onChange={(event) => handleOwnerChangedDebounced(event.target.value)}
            defaultValue={owner}
          />
          <TextField
            label="SỐ ĐIỆN THOẠI"
            variant="standard"
            sx={{ flexBasis: "49%" }}
            onChange={(event) => handlePhoneNumberChangedDebounced(event.target.value)}
            defaultValue={phone_number}
          />
        </Stack>

        <Typography variant="strong" mb={2} color="gray.700">
          THÔNG TIN CỬA HÀNG
        </Typography>
        {item.map((_item, index) => (
          <Stack key={index} direction="row" justifyContent="space-between" mb={2}>
            <TextField
              label="MẶT HÀNG KINH DOANH"
              variant="standard"
              sx={{ flexBasis: "49%" }}
              onChange={(event) => handleItemChangedDebounced(index, event.target.value, _item.is_allowed)}
              defaultValue={_item.name}
            />
            <TextField
              label="ĐƯỢC PHÉP KINH DOANH?"
              select
              variant="standard"
              sx={{ flexBasis: "49%" }}
              onChange={(event) => handleItemChangedDebounced(index, _item.name, event.target.value == "allowed")}
              defaultValue={_item.is_allowed ? "allowed" : "not-allowed"}
            >
              <MenuItem value="allowed">Cho phép kinh doanh</MenuItem>
              <MenuItem value="not-allowed">Không cho phép kinh doanh</MenuItem>
            </TextField>
          </Stack>
        ))}

        <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
          <IconButton onClick={handleAddItemButtonClicked}>
            <AddSvg size={16} />
          </IconButton>
          <Typography variant="strong" color="gray.500">
            Thêm mặt hàng
          </Typography>
        </Stack>

        <Typography variant="strong" mb={2} color="gray.700">
          CÁC CHỨNG NHẬN ĐƯỢC CẤP
        </Typography>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {certificate.map((_certificate, index) => (
            <Stack key={index} direction="row" justifyContent="space-between" mb={4}>
              <TextField
                label="TÊN CHỨNG NHẬN"
                select
                variant="standard"
                sx={{ flexBasis: "49%" }}
                value={_certificate.name}
                onChange={(event) => handleCertificateChanged(index, event.target.value, _certificate.date)}
              >
                {availableCertificates.map(({ name }) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                label="THỜI ĐIỂM ĐƯỢC CÂP"
                value={_certificate.date}
                onChange={(value) => handleCertificateChanged(index, _certificate.name, value)}
                renderInput={(params) => <TextField variant="standard" sx={{ flexBasis: "49%" }} {...params} />}
              />
            </Stack>
          ))}
        </LocalizationProvider>
        <Stack direction="row" justifyContent="center" alignItems="center" mb={4}>
          <IconButton onClick={handleAddCertificateButtonClicked}>
            <AddSvg size={16} />
          </IconButton>
          <Typography variant="strong" color="gray.500">
            Thêm chứng nhận
          </Typography>
        </Stack>

        <Stack>
          <Typography variant="strong" color="gray.500" mb={2}>
            HÌNH ẢNH CỬA HÀNG
          </Typography>

          {imageSrc && <Image src={imageSrc} borderRadius={2} width={100} height={100} />}

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

export default GroceryModal;
