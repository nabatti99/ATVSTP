import { Box, Button, debounce, MenuItem, Stack, TextField, Typography } from "@mui/material";
import ButtonIcon from "components/ButtonIcon";
import AddSvg from "components/Icons/AddSvg";
import AppModal from "../../../components/AppModal";
import Image from "../../../components/Image";
import { ADD_NEW_POST, EDIT_POST } from "./postActionTypes";

function PostModal({
  isModalOpened = true,
  postData = {},
  modalType,
  onCLoseButtonClick = () => {},
  onModalClose = () => {},
  onTitleChange = () => {},
  onContentsChange = () => {},
  onOkButtonClick = () => {},
}) {
  // Make event debounced
  const handleTitleChangedDebounced = debounce(onTitleChange, 1000);

  // Before Render
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

  const { title, contents } = postData;

  // Add buttons events
  const handleAddTextButtonCLicked = () => {
    onContentsChange([
      ...contents,
      {
        type: "text",
        value: "",
      },
    ]);
  };

  const handleAddImageButtonCLicked = () => {
    onContentsChange([
      ...contents,
      {
        type: "image",
        url: "",
        caption: "",
      },
    ]);
  };

  // Content change events
  const handleTextContentChanged = (index, value) => {
    onContentsChange([
      ...contents.slice(0, index),
      {
        ...contents[index],
        value,
      },
      ...contents.slice(index + 1),
    ]);
  };

  const handleImageCaptionContentChanged = (index, caption) => {
    onContentsChange([
      ...contents.slice(0, index),
      {
        ...contents[index],
        caption,
      },
      ...contents.slice(index + 1),
    ]);
  };

  const handleImageUrlContentChanged = (index, url) => {
    onContentsChange([
      ...contents.slice(0, index),
      {
        ...contents[index],
        url,
      },
      ...contents.slice(index + 1),
    ]);
  };

  return (
    <AppModal
      isOpened={isModalOpened}
      title={renderInfo.title}
      onCLoseButtonClick={onCLoseButtonClick}
      onModalClose={onModalClose}
    >
      <Stack minWidth="80vh">
        <TextField
          label="TIÊU ĐỀ"
          variant="standard"
          sx={{ marginBottom: 2 }}
          onChange={(event) => handleTitleChangedDebounced(event.target.value)}
          defaultValue={title}
        />
        {contents.map((content, index) => {
          if (content.type === "text")
            return (
              <TextField
                key={index}
                label="NỘI DUNG"
                multiline
                rows={5}
                sx={{ marginTop: 2 }}
                onChange={debounce((event) => handleTextContentChanged(index, event.target.value), 1000)}
                defaultValue={content.value}
              />
            );

          if (content.type === "image")
            return (
              <Stack key={index} gap={1} mt={2}>
                <Stack direction="row" gap={1} alignItems="stretch">
                  <Image borderColor="gray.500" src={content.url} width={200} alt="Hình ảnh" />
                  <TextField
                    label="TIÊU ĐỀ HÌNH ẢNH"
                    multiline
                    rows={3}
                    onChange={debounce((event) => handleImageCaptionContentChanged(index, event.target.value))}
                    defaultValue={content.value}
                    sx={{ flexGrow: 1 }}
                  />
                </Stack>
                <TextField
                  label="URL HÌNH ẢNH"
                  onChange={debounce((event) => handleImageUrlContentChanged(index, event.target.value))}
                  defaultValue={content.url}
                />
              </Stack>
            );
        })}

        <Stack direction="row" justifyContent="center" gap={4} mt={2}>
          <ButtonIcon LeftIcon={AddSvg} variant="text" onClick={handleAddTextButtonCLicked}>
            Đoạn văn
          </ButtonIcon>
          <ButtonIcon LeftIcon={AddSvg} variant="text" onClick={handleAddImageButtonCLicked}>
            Hình ảnh
          </ButtonIcon>
        </Stack>
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
