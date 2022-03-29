import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function EditProfileModal(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isModalOpened, setIsModalOpened] = useState(true);

  console.log(state);

  const handleCloseButtonClicked = () => {
    setIsModalOpened(false);
  };

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <ProfileModal
      isModalOpened={isModalOpened}
      title="Chỉnh sửa thông tin cá nhân"
      onModalClose={handleModalClose}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleCloseButtonClicked}
    />
  );
}

export default EditProfileModal;
