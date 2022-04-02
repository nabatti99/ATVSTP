import { useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EDIT_PROFILE } from "./profileActionTypes";
import ProfileModal from "./ProfileModal";
import { ADDRESS_CHANGE, NAME_CHANGE, PHONE_CHANGE, profileReducer } from "./profileReducer";

function EditProfileModal() {
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();

  const [profileData, dispatch] = useReducer(profileReducer, state);

  // Handle Data modified
  const handleNameChanged = (name) => {
    dispatch({
      type: NAME_CHANGE,
      name,
    });
  };

  const handleAddressChanged = (address) => {
    dispatch({
      type: ADDRESS_CHANGE,
      address,
    });
  };

  const handlePhoneChanged = (phone) => {
    dispatch({
      type: PHONE_CHANGE,
      phone,
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
        action: EDIT_PROFILE,
        profileData,
        isSubmitted,
      },
    });
  };

  return (
    <ProfileModal
      isModalOpened={isModalOpened}
      modalType={EDIT_PROFILE}
      profileData={profileData}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onNameChange={handleNameChanged}
      onPhoneChange={handlePhoneChanged}
      onAddressChange={handleAddressChanged}
    />
  );
}

export default EditProfileModal;
