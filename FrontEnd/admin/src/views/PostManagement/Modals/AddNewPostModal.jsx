import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import createImageFormData from "utilities/createImageFormData";
import { ADD_NEW_POST } from "./postActionTypes";
import PostModal from "./PostModal";
import { CONTENT_CHANGE, postReducer, TITLE_CHANGE } from "./postReducer";
import { connectAppContext } from "contexts/appContext/appContext";

function AddNewPostModal({ appContext }) {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [postData, dispatch] = useReducer(postReducer, {
    writer: appContext.userEmail,
    title: "",
    content: "",
  });

  // Handle Data modified
  const handleTitleChanged = (title) => {
    dispatch({
      type: TITLE_CHANGE,
      title,
    });
  };

  const handleContentChanged = (content) => {
    dispatch({
      type: CONTENT_CHANGE,
      content,
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
      request.post("/information/create", postData).then(() =>
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
      postData={postData}
      modalType={ADD_NEW_POST}
      onModalClose={handleModalClosed}
      onCLoseButtonClick={handleCloseButtonClicked}
      onOkButtonClick={handleOkButtonClicked}
      onTitleChange={handleTitleChanged}
      onContentChange={handleContentChanged}
    />
  );
}

export default connectAppContext(AddNewPostModal);
