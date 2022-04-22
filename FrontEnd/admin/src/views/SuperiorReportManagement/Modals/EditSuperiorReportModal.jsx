import { useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import { EDIT_REPORT } from "./superiorReportActionTypes";
import SuperiorReportModal from "./SuperiorReportModal";
import {
  CONTENT_CHANGE,
  INSPECTED_GROCERIES_CHANGE,
  IS_DRAFT_CHANGE,
  REGULATOR_AGENCY_CHANGE,
  REPORTING_AREA_CHANGE,
  superiorReportReducer,
  TITLE_CHANGE,
} from "./superiorReportReducer";

function EditSuperiorReportModal() {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();

  const [superiorReportData, dispatch] = useReducer(superiorReportReducer, state);

  // Handle Data modified
  const handleTitleChanged = (title) => {
    dispatch({
      type: TITLE_CHANGE,
      title,
    });
  };

  const handleInspectedGroceriesChanged = (inspected_groceries) => {
    dispatch({
      type: INSPECTED_GROCERIES_CHANGE,
      inspected_groceries,
    });
  };

  const handleReportingAreaChanged = (reporting_area) => {
    dispatch({
      type: REPORTING_AREA_CHANGE,
      reporting_area,
    });
  };

  const handleContentChanged = (content) => {
    dispatch({
      type: CONTENT_CHANGE,
      content,
    });
  };

  const handleRegulatorAgencyChanged = (regulator_agency) => {
    dispatch({
      type: REGULATOR_AGENCY_CHANGE,
      regulator_agency,
    });
  };

  const handleIsDraftChanged = (is_draft) => {
    dispatch({
      type: IS_DRAFT_CHANGE,
      is_draft,
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
      request.put(`/superior_reporting/${superiorReportData._id}`, superiorReportData).then(() =>
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
    <SuperiorReportModal
      isModalOpened={isModalOpened}
      modalType={EDIT_REPORT}
      superiorReportData={superiorReportData}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onTitleChange={handleTitleChanged}
      onContentChange={handleContentChanged}
      onInspectedGroceriesChange={handleInspectedGroceriesChanged}
      onRegularAgencyChange={handleRegulatorAgencyChanged}
      onReportingAreaChange={handleReportingAreaChanged}
    />
  );
}

export default EditSuperiorReportModal;
