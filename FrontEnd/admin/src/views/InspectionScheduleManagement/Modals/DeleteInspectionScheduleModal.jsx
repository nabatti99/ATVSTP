import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import AppModal from "../../../components/AppModal";
import { DELETE_SCHEDULE } from "./inspectionScheduleActionTypes";

function DeleteInspectionScheduleModal() {
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
      request.delete(`/inspection_schedule/${state._id}`).then(() =>
        navigate("../", {
          replace: true,
          state: {
            action: DELETE_SCHEDULE,
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
    <AppModal
      isOpened={isModalOpened}
      title="Đồng ý xoá ?"
      onCLoseButtonClick={handleCloseButtonClicked}
      onModalClose={handleModalClosed}
    >
      <Stack color="gray.500">
        <Typography variant="regular">
          Bạn đang thực hiện xoá kế hoạch thanh tra được lên lịch vào ngày:&nbsp;
          <Typography component="span" variant="strong" color="gray.700">
            {state.schedule}
          </Typography>
        </Typography>
        <Typography variant="regular" mt={1}>
          Kế hoạch này sẽ bị xoá vĩnh viễn khỏi hệ thống. Bạn có muốn tiếp tục?
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

export default DeleteInspectionScheduleModal;
