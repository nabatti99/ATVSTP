import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  debounce,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import useRequest from "hooks/useRequest";
import { connectAppContext } from "contexts/appContext/appContext";
import AppModal from "components/AppModal";
import CloseSvg from "components/Icons/CloseSvg";

function AddNewPrivateNotificationModal({ appContext }) {
  const request = useRequest();
  const navigate = useNavigate();

  const [privateNotification, setPrivateNotification] = useState({
    _id: "",
    sender: appContext.userEmail,
    title: "",
    receivers: [],
    message: "",
  });

  // Make event debounced
  const handleTitleChanged = debounce(
    (title) =>
      setPrivateNotification({
        ...privateNotification,
        title,
      }),
    1000
  );

  // Handle receivers
  const [availableReceivers, setAvailableReceivers] = useState([]);
  useEffect(() => {
    request
      .post(
        "manager/search",
        {},
        {
          params: {
            offset: 0,
            limit: 9999,
            value: "",
          },
        }
      )
      .then(({ data }) => setAvailableReceivers(data.result));
  }, []);

  const handleReceiversChanged = (receivers) => {
    setPrivateNotification({
      ...privateNotification,
      receivers,
    });
  };

  // Handle message
  const handleMessageChanged = debounce((message) => {
    setPrivateNotification({
      ...privateNotification,
      message,
    });
  }, 1000);

  // Handle modal behaviors
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleModalClosed = () => {
    if (isSubmitted)
      request.post("notification", privateNotification).finally(() =>
        navigate("../", {
          replace: true,
          state: {
            isSubmitted: true,
          },
        })
      );
    else
      navigate("../", {
        replace: true,
      });
  };

  const handleOkButtonClicked = () => {
    setIsSubmitted(true);
    setIsModalOpened(false);
  };

  // Get all notification info
  const { sender = "", title = "", receivers = [], message = "" } = privateNotification;

  return (
    <AppModal
      isOpened={isModalOpened}
      title="G???i th??ng b??o"
      onCLoseButtonClick={() => setIsModalOpened(false)}
      onModalClose={handleModalClosed}
    >
      <Stack minWidth="72rem">
        <TextField
          label="TI??U ?????"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleTitleChanged(event.target.value)}
          defaultValue={title}
        />

        <TextField label="NG?????I G???I" variant="standard" disabled sx={{ marginBottom: 2 }} defaultValue={sender} />

        <Typography variant="strong" color="gray.700" mt={4}>
          DANH S??CH NG?????I NH???N TH??NG B??O
        </Typography>

        <TextField
          label="T??M KI???M NG?????I NH???N"
          select
          variant="standard"
          sx={{ marginTop: 1 }}
          onChange={(event) => handleReceiversChanged([...receivers, event.target.value])}
        >
          {availableReceivers.map((manager) => (
            <MenuItem value={manager.email} key={manager.email}>
              {manager.email}
            </MenuItem>
          ))}
        </TextField>

        <List disablePadding>
          {receivers.map((email, index) => (
            <ListItem key={email}>
              <ListItemIcon>
                <IconButton
                  onClick={() =>
                    handleReceiversChanged([...receivers.slice(0, index), ...receivers.slice(index + 1)])
                  }
                >
                  <CloseSvg />
                </IconButton>
              </ListItemIcon>
              <ListItemText>{email}</ListItemText>
            </ListItem>
          ))}
        </List>

        <TextField
          label="N???I DUNG"
          multiline
          rows={8}
          sx={{ flexGrow: 1, marginTop: 4 }}
          onChange={(event) => handleMessageChanged(event.target.value)}
          defaultValue={message}
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-end" mt={4}>
        <Button variant="outlined" onClick={handleOkButtonClicked}>
          Ho??n th??nh
        </Button>
      </Stack>
    </AppModal>
  );
}

export default connectAppContext(AddNewPrivateNotificationModal);
