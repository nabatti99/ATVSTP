import { useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EDIT_CERTIFICATE } from "./certificateActionTypes";
import CertificateModal from "./CertificateModal";
import {
  AVATAR_CHANGE,
  certificateReducer,
  EFFECTIVE_TIME_CHANGE,
  MANAGER_CHANGE,
  NAME_CHANGE,
} from "./certificateReducer";

function EditCertificateModal() {
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();

  const [certificateData, dispatch] = useReducer(certificateReducer, state);

  // Handle Data modified
  const handleNameChanged = (name) => {
    dispatch({
      type: NAME_CHANGE,
      name,
    });
  };

  const handleManagerChanged = (manager) => {
    dispatch({
      type: MANAGER_CHANGE,
      manager,
    });
  };

  const handleEffectiveTimeChanged = (effectiveTime) => {
    dispatch({
      type: EFFECTIVE_TIME_CHANGE,
      effectiveTime,
    });
  };

  const handleAvatarChanged = (avatarFile) => {
    dispatch({
      type: AVATAR_CHANGE,
      avatar: avatarFile,
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
    navigate("../", {
      replace: true,
      state: {
        action: EDIT_CERTIFICATE,
        certificateData,
        isSubmitted,
      },
    });
  };

  return (
    <CertificateModal
      isModalOpened={isModalOpened}
      modalType={EDIT_CERTIFICATE}
      certificateData={certificateData}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onNameChange={handleNameChanged}
      onManagerChange={handleManagerChanged}
      onEffectiveTimeChange={handleEffectiveTimeChanged}
      onAvatarChange={handleAvatarChanged}
    />
  );
}

export default EditCertificateModal;
