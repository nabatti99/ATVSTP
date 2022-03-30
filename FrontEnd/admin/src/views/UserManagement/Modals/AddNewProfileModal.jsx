import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_NEW_PROFILE } from "./profileActionTypes";
import ProfileModal from "./ProfileModal";
import { ADDRESS_CHANGE, EMAIL_CHANGE, NAME_CHANGE, PHONE_CHANGE, profileReducer } from "./profileReducer";

function AddNewProfileModal() {
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [profileData, dispatch] = useReducer(profileReducer, {
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  // Handle Data modified
  const handleNameChanged = (name) => {
    dispatch({
      type: NAME_CHANGE,
      name,
    });
  };

  const handleEmailChanged = (email) => {
    dispatch({
      type: EMAIL_CHANGE,
      email,
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
        action: ADD_NEW_PROFILE,
        profileData,
        isSubmitted,
      },
    });
  };

  return (
    <ProfileModal
      isModalOpened={isModalOpened}
      modalType={ADD_NEW_PROFILE}
      profileData={profileData}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onNameChange={handleNameChanged}
      onPhoneChange={handlePhoneChanged}
      onEmailChange={handleEmailChanged}
      onAddressChange={handleAddressChanged}
    />
  );
}

export default AddNewProfileModal;
