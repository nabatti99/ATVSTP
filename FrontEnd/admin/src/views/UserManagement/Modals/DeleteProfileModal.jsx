import { Box, Button, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppModal from "../../../components/AppModal";
import { DELETE_PROFILE } from "./profileActionTypes";

function DeleteProfileModal() {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();

  const handleCloseButtonClicked = () => setIsModalOpened(false);

  const handleSubmitButtonClicked = () => {
    setIsSubmitted(true);
    setIsModalOpened(false);
  };

  const handleModalClosed = () => {
    if (isSubmitted)
      request.delete(`/manager/delete_a_manager/${state.email}`).then(({ data }) => {
        if (data.Status == "Fail") {
          throw new Error(data.Message);
        }

        navigate("../", {
          replace: true,
          state: {
            action: DELETE_PROFILE,
            isSubmitted,
          },
        });
      });
    else
      navigate("../", {
        replace: true,
      });
  };

  return (
    <AppModal
      isOpened={isModalOpened}
      title="Đồng ý xoá ?"
      onCLoseButtonClick={handleCloseButtonClicked}
      onModalClose={handleModalClosed}
    >
      <Stack color="gray.500">
        <Typography variant="regular">
          Bạn đang thực hiện xoá người dùng có email là:&nbsp;
          <Typography component="span" variant="strong" color="gray.700">
            {state.email}
          </Typography>
        </Typography>
        <Typography variant="regular" mt={1}>
          Người dùng này sẽ không thể tiếp tục truy cập vào hệ thống này nữa. Bạn có muốn tiếp tục?
        </Typography>

        <Stack justifyContent="flex-end" direction="row" mt={2}>
          <Box>
            <Button color="red" variant="outlined" onClick={handleSubmitButtonClicked}>
              Xoá
            </Button>
          </Box>
        </Stack>
      </Stack>
    </AppModal>
  );
}

export default DeleteProfileModal;
