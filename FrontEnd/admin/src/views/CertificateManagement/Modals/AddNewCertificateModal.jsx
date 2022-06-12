import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import createImageFormData from "utilities/createImageFormData";
import { ADD_NEW_CERTIFICATE } from "./certificateActionTypes";
import CertificateModal from "./CertificateModal";
import {
  AVATAR_CHANGE,
  EFFECTIVE_TIME_CHANGE,
  MANAGER_CHANGE,
  NAME_CHANGE,
  certificateReducer,
} from "./certificateReducer";

function AddNewCertificateModal() {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [certificateData, dispatch] = useReducer(certificateReducer, {
    name: "",
    manager: "",
    effective_time: "",
    avatar: "",
  });

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
    if (isSubmitted)
      request
        .post("/certificate", certificateData)
        .then(
          () =>
            certificateData.avatar &&
            request.post(
              `certificate/save_image/${certificateData.name}`,
              createImageFormData(certificateData.avatar),
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
        )
        .then(() =>
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
      certificateData={certificateData}
      modalType={ADD_NEW_CERTIFICATE}
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

export default AddNewCertificateModal;
