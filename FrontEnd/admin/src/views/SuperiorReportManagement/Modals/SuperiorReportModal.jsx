import {
  Button,
  Checkbox,
  debounce,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddSvg from "components/Icons/AddSvg";
import CloseSvg from "components/Icons/CloseSvg";
import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
import makeSelections from "utilities/makeSelections";
import AppModal from "../../../components/AppModal";
import Image from "../../../components/Image";
import { ADD_NEW_REPORT, EDIT_REPORT } from "./superiorReportActionTypes";

function SuperiorReportModal({
  isModalOpened = true,
  superiorReportData = {},
  modalType,
  onCLoseButtonClick = () => {},
  onModalClose = () => {},
  onTitleChange = () => {},
  onReportingAreaChange = () => {},
  onInspectedGroceriesChange = () => {},
  onContentChange = () => {},
  onRegularAgencyChange = () => {},
  onIsDraftChange = () => {},
  onOkButtonClick = () => {},
}) {
  const request = useRequest();

  // Make event debounced
  const handleTitleChangedDebounced = debounce(onTitleChange, 1000);
  const handleContentChangedDebounced = debounce(onContentChange, 1000);
  const handleReportingAreaChangedDebounced = debounce(onReportingAreaChange, 1000);

  // Get all grocery info
  const { title, writer, reporting_area, inspected_groceries, content, regulator_agency, is_draft } =
    superiorReportData;

  // Handle Groceries
  const [availableGroceries, setAvailableGroceries] = useState([]);
  useEffect(() => {
    request
      .get("grocery", {
        params: {
          offset: 0,
          limit: 1000,
          value: "",
        },
      })
      .then((res) => {
        setAvailableGroceries(res.data.result);
      });
  }, []);

  const handleAddGrocery = (groceryName) => {
    onInspectedGroceriesChange([...inspected_groceries, groceryName]);
  };

  const handleGroceryChanged = (index, groceryName) => {
    inspected_groceries[index] = groceryName;
    onInspectedGroceriesChange([...inspected_groceries]);
  };

  const renderInfo = {
    title: "",
  };

  // Handle Regulator Agency
  const [availableRegulatorAgencies, setAvailableRegulatorAgencies] = useState([]);
  useEffect(() => {
    request
      .get("administration/read", {
        params: {
          offset: 0,
          limit: 1000,
          value: "",
        },
      })
      .then((res) => {
        setAvailableRegulatorAgencies(res.data.data);
      });
  }, []);

  switch (modalType) {
    case ADD_NEW_REPORT:
      renderInfo.title = "Th??m b???n b??o c??o m???i";
      break;

    case EDIT_REPORT:
      renderInfo.title = "Ch???nh s???a n???i dung b??o c??o";
      break;

    default:
      throw new Error("L???nh kh??ng ????ng");
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
          label="TI??U ????? B??O C??O"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleTitleChangedDebounced(event.target.value)}
          defaultValue={title}
        />

        <TextField
          label="KHU V???C B??O C??O"
          variant="standard"
          sx={{ marginBottom: 4 }}
          onChange={(event) => handleReportingAreaChangedDebounced(event.target.value)}
          defaultValue={reporting_area}
        />

        <Typography variant="strong" mb={2} color="gray.700">
          ?????I T?????NG B??O C??O
        </Typography>
        <TextField
          label="T??M KI???M C???A H??NG C???N THANH TRA"
          select
          variant="standard"
          onChange={(event) => handleAddGrocery(event.target.value)}
        >
          {availableGroceries.map(({ name }) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </TextField>

        <List disablePadding sx={{ marginBottom: 4 }}>
          {inspected_groceries.map((grocery, index) => (
            <ListItem key={grocery}>
              <ListItemIcon>
                <IconButton
                  onClick={() =>
                    onInspectedGroceriesChange([
                      ...inspected_groceries.slice(0, index),
                      ...inspected_groceries.slice(index + 1),
                    ])
                  }
                >
                  <CloseSvg />
                </IconButton>
              </ListItemIcon>
              <ListItemText>{grocery}</ListItemText>
            </ListItem>
          ))}
        </List>

        <TextField
          label="N???I DUNG"
          variant="outlined"
          multiline
          rows={10}
          sx={{ marginBottom: 4 }}
          onChange={(event) => handleContentChangedDebounced(event.target.value)}
          defaultValue={content}
        />

        <TextField label="NG?????I VI???T" variant="outlined" disabled sx={{ marginBottom: 4 }} value={writer} />

        <TextField
          label="N??I NH???N B??O C??O"
          select
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => onRegularAgencyChange(event.target.value)}
          value={regulator_agency}
        >
          {availableRegulatorAgencies.map(({ name }) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={is_draft}
              onChange={(event) => onIsDraftChange(event.target.checked)}
            />
          }
          label="Ch??? t???o b???n nh??p"
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-end" mt={4}>
        <Button variant="outlined" onClick={onOkButtonClick}>
          Ho??n th??nh
        </Button>
      </Stack>
    </AppModal>
  );
}

export default SuperiorReportModal;
