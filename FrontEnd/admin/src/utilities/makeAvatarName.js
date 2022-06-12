function makeAvatarName(name = "", maxLetters = 2) {
  return name
    .split(" ")
    .slice(0, maxLetters)
    .map((word) => word[0])
    .join("");
}

export default makeAvatarName;
