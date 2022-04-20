import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import { ADD_NEW_SCHEDULE } from "./inspectionScheduleActionTypes";
import InspectionScheduleModal from "./InspectionScheduleModal";
import {
  ASSIGNED_TO_CHANGE,
  AUTHORITY_CHANGE,
  GROCERIES_CHANGE,
  inspectionScheduleReducer,
  SCHEDULE_CHANGE,
} from "./inspectionScheduleReducer";
import { exportDate } from "utilities/formatDate";

function AddNewInspectionScheduleModal() {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [inspectionScheduleData, dispatch] = useReducer(inspectionScheduleReducer, {
    authority: "",
    groceries: [],
    content: "",
    assigned_to: [],
    schedule: new Date(),
    updated_by: "",
    is_draft: true,
  });

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
        .post("inspection_schedule", {
          ...inspectionScheduleData,
          schedule: exportDate(inspectionScheduleData.schedule),
        })
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
      modalType={ADD_NEW_SCHEDULE}
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

export default AddNewInspectionScheduleModal;
