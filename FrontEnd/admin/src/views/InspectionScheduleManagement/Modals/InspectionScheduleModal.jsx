import {
  Button,
  debounce,
  MenuItem,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CloseSvg from "components/Icons/CloseSvg";
import useRequest from "hooks/useRequest";
import { useEffect, useRef, useState } from "react";
import { importDate } from "utilities/formatDate";
import AppModal from "../../../components/AppModal";
import { ADD_NEW_SCHEDULE, EDIT_SCHEDULE } from "./inspectionScheduleActionTypes";

function InspectionScheduleModal({
  isModalOpened = true,
  inspectionScheduleData = {},
  modalType,
  onCLoseButtonClick = () => {},
  onModalClose = () => {},
  onScheduleChange = () => {},
  onAuthorityChange = () => {},
  onGroceriesChange = () => {},
  onInspectorsChange = () => {},
  onOkButtonClick = () => {},
}) {
  const request = useRequest();

  // Make event debounced
  // const handleScheduleChangedDebounced = debounce(onScheduleChange, 1000);

  // Handle Authorities
  const [availableAuthorities, setAvailableAuthorities] = useState([]);
  useEffect(() => {
    // request
    //   .get("administration/read", {
    //     params: {
    //       offset: 0,
    //       limit: 1000,
    //       value: "",
    //     },
    //   })
    //   .then((res) => {
    //     setAvailableAuthorities(res.data.result);
    //   });
    setAvailableAuthorities([
      {
        name: "A1",
      },
      {
        name: "A2",
      },
      {
        name: "A3",
      },
    ]);
  }, []);

  // Handle Groceries
  const [availableGroceries, setAvailableGroceries] = useState([]);
  useEffect(() => {
    // request
    //   .get("grocery", {
    //     params: {
    //       offset: 0,
    //       limit: 1000,
    //       value: "",
    //     },
    //   })
    //   .then((res) => {
    //     setAvailableGroceries(res.data.result);
    //   });
    setAvailableGroceries([
      {
        name: "G1",
      },
      {
        name: "G2",
      },
      {
        name: "G3",
      },
    ]);
  }, []);

  // Handle Inspectors
  const [availableInspectors, setAvailableInspectors] = useState([]);
  useEffect(() => {
    // request
    //   .get("manager/get_all_manager", {
    //     params: {
    //       offset: 0,
    //       limit: 1000,
    //     },
    //   })
    //   .then((res) => {
    //     setAvailableInspectors(res.data.result);
    //   });

    setAvailableInspectors([{ email: "admin@gmail.com" }, { email: "minh@gmail.com" }]);
  }, []);

  const renderInfo = {
    title: "",
  };

  switch (modalType) {
    case ADD_NEW_SCHEDULE:
      renderInfo.title = "Thêm kế hoạch thanh tra mới";
      break;

    case EDIT_SCHEDULE:
      renderInfo.title = "Chỉnh sửa kế hoạch thanh tra";
      break;

    default:
      throw new Error("Lệnh không đúng");
  }

  const {
    authority,
    groceries = [],
    content,
    assigned_to = [],
    schedule = "",
    updated_by,
    is_draft = true,
  } = inspectionScheduleData;

  return (
    <AppModal
      isOpened={isModalOpened}
      title={renderInfo.title}
      onCLoseButtonClick={onCLoseButtonClick}
      onModalClose={onModalClose}
    >
      <Stack>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="THỜI GIAN"
            value={importDate(schedule)}
            onChange={(value) => onScheduleChange(value)}
            renderInput={(params) => <TextField variant="standard" sx={{ marginRight: 2 }} {...params} />}
          />
        </LocalizationProvider>

        <TextField
          label="ĐƠN VỊ CHỈ ĐỊNH THANH TRA"
          select
          variant="standard"
          sx={{ marginTop: 2 }}
          onChange={(event) => onAuthorityChange(event.target.value)}
          defaultValue={authority}
        >
          {availableAuthorities.map((authority) => (
            <MenuItem value={authority.name} key={authority.name}>
              {authority.name}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="strong" color="gray.700" mt={4}>
          DANH SÁCH CÁC CỬA HÀNG CẦN THANH TRA
        </Typography>

        <TextField
          label="TÌM KIẾM CỬA HÀNG"
          select
          variant="standard"
          sx={{ marginTop: 2 }}
          onChange={(event) => onGroceriesChange([...groceries, event.target.value])}
          defaultValue={authority}
        >
          {availableGroceries.map((grocery) => (
            <MenuItem value={grocery.name} key={grocery.name}>
              {grocery.name}
            </MenuItem>
          ))}
        </TextField>

        <List disablePadding>
          {groceries.map((grocery, index) => (
            <ListItem key={grocery}>
              <ListItemIcon>
                <IconButton
                  onClick={() => onGroceriesChange([...groceries.slice(0, index), ...groceries.slice(index + 1)])}
                >
                  <CloseSvg />
                </IconButton>
              </ListItemIcon>
              <ListItemText>{grocery}</ListItemText>
            </ListItem>
          ))}
        </List>

        <Typography variant="strong" color="gray.700" mt={4}>
          DANH SÁCH THANH TRA VIÊN
        </Typography>

        <TextField
          label="TÌM KIẾM THANH TRA"
          select
          variant="standard"
          sx={{ marginTop: 2 }}
          onChange={(event) => onInspectorsChange([...assigned_to, event.target.value])}
          defaultValue={authority}
        >
          {availableInspectors.map((inspector) => (
            <MenuItem value={inspector.email} key={inspector.email}>
              {inspector.email}
            </MenuItem>
          ))}
        </TextField>

        <List disablePadding>
          {assigned_to.map((email, index) => (
            <ListItem key={email}>
              <ListItemIcon>
                <IconButton
                  onClick={() =>
                    onInspectorsChange([...assigned_to.slice(0, index), ...assigned_to.slice(index + 1)])
                  }
                >
                  <CloseSvg />
                </IconButton>
              </ListItemIcon>
              <ListItemText>{email}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={4}>
        <Button variant="outlined" onClick={onOkButtonClick}>
          Hoàn thành
        </Button>
      </Stack>
    </AppModal>
  );
}

export default InspectionScheduleModal;
