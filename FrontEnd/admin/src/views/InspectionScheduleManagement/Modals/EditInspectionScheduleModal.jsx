import { useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import useRequest from "hooks/useRequest";
import { EDIT_SCHEDULE } from "./inspectionScheduleActionTypes";
import InspectionScheduleModal from "./InspectionScheduleModal";
import {
  ASSIGNED_TO_CHANGE,
  AUTHORITY_CHANGE,
  GROCERIES_CHANGE,
  inspectionScheduleReducer,
  SCHEDULE_CHANGE,
} from "./inspectionScheduleReducer";
import { exportDate } from "utilities/formatDate";

function EditInspectionScheduleModal() {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();

  const [inspectionScheduleData, dispatch] = useReducer(inspectionScheduleReducer, state);

  // Handle Data modified
  const handleScheduleChanged = (schedule) => {
    dispatch({
      type: SCHEDULE_CHANGE,
      schedule: exportDate(new Date(schedule)),
    });
  };

  const handleAuthorityChanged = (authority) => {
    dispatch({
      type: AUTHORITY_CHANGE,
      authority,
    });
  };

  const handleGroceriesChanged = (groceries) => {
    dispatch({
      type: GROCERIES_CHANGE,
      groceries,
    });
  };

  const handleInspectorsChanged = (assigned_to) => {
    dispatch({
      type: ASSIGNED_TO_CHANGE,
      assigned_to,
    });
  };

  // Handle Modal events
  const handleCloseButtonClicked = () => {
    setIsModalOpened(false);
  };

  const handleOkButtonClicked = () => {
    setIsSubmitted(true);
    setIsModalOpened(false);
  };

  const handleModalClosed = () => {
    if (isSubmitted)
      request
        .put(`inspection_schedule/${state._id}`, inspectionScheduleData)
        .then(() =>
          navigate("../", {
            replace: true,
            state: {
              isSubmitted,
            },
          })
        )
        .catch((err) =>
          navigate("../", {
            replace: true,
          })
        );
    else
      navigate("../", {
        replace: true,
      });
  };

  return (
    <InspectionScheduleModal
      isModalOpened={isModalOpened}
      inspectionScheduleData={inspectionScheduleData}
      modalType={EDIT_SCHEDULE}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onAuthorityChange={handleAuthorityChanged}
      onGroceriesChange={handleGroceriesChanged}
      onScheduleChange={handleScheduleChanged}
      onInspectorsChange={handleInspectorsChanged}
    />
  );
}

export default EditInspectionScheduleModal;
