import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import createImageFormData from "utilities/createImageFormData";
import { ADD_NEW_GROCERY } from "./groceryActionTypes";
import GroceryModal from "./GroceryModal";
import {
  ADDRESS_CHANGE,
  AVATAR_CHANGE,
  CERTIFICATES_CHANGE,
  groceryReducer,
  ITEMS_CHANGE,
  NAME_CHANGE,
  OWNER_CHANGE,
  PHONE_NUMBER_CHANGE,
  STATUS_CHANGE,
} from "./groceryReducer";

function AddNewGroceryModal() {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [groceryData, dispatch] = useReducer(groceryReducer, {
    name: "",
    owner: "",
    phone_number: "",
    address: "",
    status: "active",
    item: [],
    certificate: [],
    avatar: "",
  });

  // Handle Data modified
  const handleNameChanged = (name) => {
    dispatch({
      type: NAME_CHANGE,
      name,
    });
  };

  const handleOwnerChanged = (owner) => {
    dispatch({
      type: OWNER_CHANGE,
      owner,
    });
  };

  const handleAddressChanged = (address) => {
    dispatch({
      type: ADDRESS_CHANGE,
      address,
    });
  };

  const handleStatusChanged = (status) => {
    dispatch({
      type: STATUS_CHANGE,
      status,
    });
  };

  const handlePhoneNumberChanged = (phoneNumber) => {
    dispatch({
      type: PHONE_NUMBER_CHANGE,
      phoneNumber,
    });
  };

  const handleItemsChanged = (items) => {
    dispatch({
      type: ITEMS_CHANGE,
      items,
    });
  };

  const handleCertificatesChanged = (certificates) => {
    dispatch({
      type: CERTIFICATES_CHANGE,
      certificates,
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
        .post("grocery", groceryData)
        .then(
          () =>
            groceryData.avatar &&
            request.post(`grocery/save_image/${groceryData.name}`, createImageFormData(groceryData.avatar), {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
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
    <GroceryModal
      isModalOpened={isModalOpened}
      modalType={ADD_NEW_GROCERY}
      groceryData={groceryData}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onNameChange={handleNameChanged}
      onOwnerChange={handleOwnerChanged}
      onAddressChange={handleAddressChanged}
      onPhoneNumberChange={handlePhoneNumberChanged}
      onStatusChange={handleStatusChanged}
      onItemsChange={handleItemsChanged}
      onCertificatesChange={handleCertificatesChanged}
      onAvatarChange={handleAvatarChanged}
    />
  );
}

export default AddNewGroceryModal;
