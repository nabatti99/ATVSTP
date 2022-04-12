const createImageFormData = (imageFile) => {
  const avatarFormData = new FormData();
  avatarFormData.append("upload", imageFile);
  return avatarFormData;
};

export default createImageFormData;
