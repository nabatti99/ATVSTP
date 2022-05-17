import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import useRequest from "hooks/useRequest";
import createImageFormData from "utilities/createImageFormData";
import { ADD_NEW_POST } from "./postActionTypes";
import PostModal from "./PostModal";
import { CONTENTS_CHANGE, postReducer, TITLE_CHANGE } from "./postReducer";
import { connectAppContext } from "contexts/appContext/appContext";

function AddNewPostModal({ appContext }) {
  const navigate = useNavigate();
  const request = useRequest();
  const [isModalOpened, setIsModalOpened] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [postData, dispatch] = useReducer(postReducer, {
    writer: appContext.userEmail,
    title: "",
    contents: [],
    writer: appContext.userEmail,
  });

  console.log(postData);

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
      request.post("/information/create", postData).finally(() =>
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
      onContentsChange={handleContentsChanged}
    />
  );
}

export default connectAppContext(AddNewPostModal);
