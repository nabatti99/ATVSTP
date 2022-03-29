import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function AddNewProfileModal(props) {
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(true);

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

export default AddNewProfileModal;
