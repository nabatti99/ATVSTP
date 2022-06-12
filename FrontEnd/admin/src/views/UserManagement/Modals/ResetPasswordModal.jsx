import { Box, Button, Stack, Typography } from "@mui/material";

import useRequest from "hooks/useRequest";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppModal from "../../../components/AppModal";

function ResetPasswordModal() {
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
      request.post(`/manager/new_password/${state.email}`).then(({ data }) => {
        if (data.Status == "Fail") {
          throw new Error(data.Message);
        }

        navigate("../", {
          replace: true,
          state: {
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
      title="Đặt lại mật khẩu"
      onCLoseButtonClick={handleCloseButtonClicked}
      onModalClose={handleModalClosed}
    >
      <Stack color="gray.500">
        <Typography variant="regular">
          Bạn đang thực hiện đặt lại mật khẩu cho người dùng có email là:&nbsp;
          <Typography component="span" variant="strong" color="gray.700">
            {state.email}
          </Typography>
        </Typography>
        <Typography variant="regular" mt={1}>
          Người dùng này sẽ nhận được email thông báo về việc đổi mật khẩu. Bạn có muốn tiếp tục?
        </Typography>

        <Stack justifyContent="flex-end" direction="row" mt={2}>
          <Box>
            <Button color="blue" variant="outlined" onClick={handleSubmitButtonClicked}>
              Đồng ý
            </Button>
          </Box>
        </Stack>
      </Stack>
    </AppModal>
  );
}

export default ResetPasswordModal;
