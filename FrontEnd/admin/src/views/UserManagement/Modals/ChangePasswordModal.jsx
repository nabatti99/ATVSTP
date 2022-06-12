import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import AppModal from "../../../components/AppModal";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

function ChangePasswordModal() {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    retypedPassword: "",
  });

  // Handle Data modified
  const handleOldPasswordChanged = (oldPassword) => {
    setPasswordData({
      ...passwordData,
      oldPassword,
    });
  };

  const handleNewPasswordChanged = (newPassword) => {
    setPasswordData({
      ...passwordData,
      newPassword,
    });
  };

  const handleRetypedPasswordChanged = (retypedPassword) => {
    setPasswordData({
      ...passwordData,
      retypedPassword,
    });
  };

  // Handle Modal events
  const handleCloseButtonClicked = () => {
    setIsModalOpened(false);
  };

  const handleOkButtonClicked = () => {
    if (passwordData.newPassword.length < 6) {
      alert("Mật khẩu phải ít nhất 6 ký tự");
      return;
    }

    if (passwordData.newPassword != passwordData.retypedPassword) {
      alert("Mật khẩu nhập lại không khớp");
      return;
    }

    setIsSubmitted(true);
    setIsModalOpened(false);
  };

  const handleModalClosed = () => {
    if (isSubmitted)
      request
        .post(`manager/reset_password/${state.email}`, {
          current_password: passwordData.oldPassword,
          new_password: passwordData.newPassword,
        })
        .then(({ data }) => {
          if (data.Status == "Fail") {
            throw new Error(data.Message);
          }

          alert("Đổi mật khẩu thành công");
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            alert(error.response.data.Message);
          }
        })
        .finally(() =>
          navigate("../", {
            replace: true,
            state: {
              isSubmitted,
            },
          })
        );
    else
      navigate("../", {
        replace: true,
      });
  };

  return (
    <AppModal isOpened={isModalOpened} title="Đổi mật khẩu" onCLoseButtonClick={handleCloseButtonClicked} onModalClose={handleModalClosed}>
      <Stack>
        <Typography variant="regular" color="gray.500" mb={2}>
          Bạn đang thực hiện đổi mật khẩu cho người dùng có email là:&nbsp;
          <Typography component="span" variant="strong" color="gray.700">
            {state.email}
          </Typography>
        </Typography>

        <TextField
          type="password"
          label="MẬT KHẨU CŨ"
          placeholder="Nhập mật khẩu cũ của bạn"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleOldPasswordChanged(event.target.value)}
        />

        <TextField
          type="password"
          label="MẬT KHẨU MỚI"
          placeholder="Nhập mật khẩu bạn muốn đổi"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleNewPasswordChanged(event.target.value)}
        />

        <TextField
          type="password"
          label="NHẬP LẠI MẬT KHẨU MỚI"
          placeholder="Nhập lại mật khẩu mới của bạn"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleRetypedPasswordChanged(event.target.value)}
        />

        <Stack justifyContent="flex-end" direction="row" mt={2}>
          <Box>
            <Button color="blue" variant="outlined" onClick={handleOkButtonClicked}>
              Đồng ý
            </Button>
          </Box>
        </Stack>
      </Stack>
    </AppModal>
  );
}

export default ChangePasswordModal;
