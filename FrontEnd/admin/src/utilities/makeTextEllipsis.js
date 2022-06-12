function makeTextEllipsis(text = "", maxWord = 10) {
  return text.split(" ").slice(0, maxWord).join(" ") + "...";
}

export default makeTextEllipsis;
