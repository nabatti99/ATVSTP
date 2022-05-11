import { Assets } from "react-native-ui-lib";

export default function loadImages(): void {
  Assets.loadAssetsGroup("demo", {
    logo: require("../assets/images/icon.png"),
    feedback: require("../assets/images/feedback.png"),
  });
}
