import { useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import createImageFormData from "utilities/createImageFormData";
import { EDIT_ADMINISTRATION } from "./administrationActionTypes";
import AdministrationModal from "./AdministrationModal";
import { administrationReducer, NAME_CHANGE, PHONE_CHANGE, RESPONSIBLE_CHANGE } from "./administrationReducer";

function EditAdministrationModal() {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();

  const [administrationData, dispatch] = useReducer(administrationReducer, state);

  // Handle Data modified
  const handleNameChanged = (name) => {
    dispatch({
      type: NAME_CHANGE,
      name,
    });
  };

  const handlePhoneChanged = (phoneNumber) => {
    dispatch({
      type: PHONE_CHANGE,
      phoneNumber,
    });
  };

  const handleResponsibleChanged = (responsible) => {
    dispatch({
      type: RESPONSIBLE_CHANGE,
      responsible,
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
      request.put(`/administration/update`, administrationData).then(() =>
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
    <AdministrationModal
      isModalOpened={isModalOpened}
      administrationData={administrationData}
      modalType={EDIT_ADMINISTRATION}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onNameChange={handleNameChanged}
      onPhoneChange={handlePhoneChanged}
      onResponsibleChange={handleResponsibleChanged}
    />
  );
}

export default EditAdministrationModal;
