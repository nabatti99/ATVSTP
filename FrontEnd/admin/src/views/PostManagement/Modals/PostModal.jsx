import { Box, Button, debounce, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import AppModal from "../../../components/AppModal";
import Image from "../../../components/Image";
import { ADD_NEW_POST, EDIT_POST } from "./postActionTypes";
import { TITLE_CHANGE } from "./postReducer";

function PostModal({
  isModalOpened = true,
  postData = {},
  modalType,
  onCLoseButtonClick = () => {},
  onModalClose = () => {},
  onTitleChange = () => {},
  onContentChange = () => {},
  onOkButtonClick = () => {},
}) {
  const avatarFileRef = useRef();

  // Make event debounced
  const handleTitleChangedDebounced = debounce(onTitleChange, 1000);
  const handleContentChangedDebounced = debounce(onContentChange, 1000);

  // Handle Events

  const renderInfo = {
    title: "",
  };

  switch (modalType) {
    case ADD_NEW_POST:
      renderInfo.title = "Thêm bài đăng mới";
      break;

    case EDIT_POST:
      renderInfo.title = "Chỉnh sửa bài đăng";
      break;

    default:
      throw new Error("Lệnh không đúng");
  }

  const { title, content } = postData;

  return (
    <AppModal
      isOpened={isModalOpened}
      title={renderInfo.title}
      onCLoseButtonClick={onCLoseButtonClick}
      onModalClose={onModalClose}
    >
      <Stack>
        <TextField
          label="TIÊU ĐỀ"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleTitleChangedDebounced(event.target.value)}
          defaultValue={title}
        />
        <TextField
          label="NỘI DUNG"
          multiline
          rows={10}
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleContentChangedDebounced(event.target.value)}
          defaultValue={content}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={4}>
        <Button variant="outlined" onClick={onOkButtonClick}>
          Hoàn thành
        </Button>
      </Stack>
    </AppModal>
  );
}

export default PostModal;
