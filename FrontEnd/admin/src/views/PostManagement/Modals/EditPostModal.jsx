import { useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import { EDIT_POST } from "./postActionTypes";
import PostModal from "./PostModal";
import { CONTENTS_CHANGE, postReducer, TITLE_CHANGE } from "./postReducer";
import { connectAppContext } from "contexts/appContext/appContext";

function EditPostModal({ appContext }) {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();
  state.edit_by = appContext.userEmail;

  const [postData, dispatch] = useReducer(postReducer, state);

  // Handle Data modified
  const handleTitleChanged = (title) => {
    dispatch({
      type: TITLE_CHANGE,
      title,
    });
  };

  const handleContentsChanged = (contents) => {
    dispatch({
      type: CONTENTS_CHANGE,
      contents,
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
      request.put(`/information/update`, postData).finally(() =>
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
    <PostModal
      isModalOpened={isModalOpened}
      modalType={EDIT_POST}
      postData={postData}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onTitleChange={handleTitleChanged}
      onContentsChange={handleContentsChanged}
    />
  );
}

export default connectAppContext(EditPostModal);
