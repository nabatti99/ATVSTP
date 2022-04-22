import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import createImageFormData from "utilities/createImageFormData";
import { ADD_NEW_REPORT } from "./superiorReportActionTypes";
import CertificateModal from "./SuperiorReportModal";
import {
  CONTENT_CHANGE,
  INSPECTED_GROCERIES_CHANGE,
  IS_DRAFT_CHANGE,
  REGULATOR_AGENCY_CHANGE,
  REPORTING_AREA_CHANGE,
  superiorReportReducer,
  TITLE_CHANGE,
  WRITER_CHANGE,
} from "./superiorReportReducer";
import { connectAppContext } from "contexts/appContext/appContext";

function AddNewSuperiorReportModal({ appContext }) {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [superiorReportData, dispatch] = useReducer(superiorReportReducer, {
    title: "",
    writer: appContext.userEmail,
    reporting_area: "",
    inspected_groceries: [],
    content: "",
    regulator_agency: "",
    is_draft: true,
  });

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
      request.post("/superior_reporting", superiorReportData).then(() =>
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
    <CertificateModal
      isModalOpened={isModalOpened}
      superiorReportData={superiorReportData}
      modalType={ADD_NEW_REPORT}
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

export default connectAppContext(AddNewSuperiorReportModal);
