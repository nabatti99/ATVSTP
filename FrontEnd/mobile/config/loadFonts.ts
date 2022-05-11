import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Typography } from "react-native-ui-lib";

export default function loadFonts() {
  return Font.loadAsync({
    ...FontAwesome.font,
    BeVNProLight: require("../assets/fonts/BeVietnamPro/BeVietnamPro-Light.ttf"),
    BeVNProRegular: require("../assets/fonts/BeVietnamPro/BeVietnamPro-Regular.ttf"),
    BeVNProMedium: require("../assets/fonts/BeVietnamPro/BeVietnamPro-Medium.ttf"),
    BeVNProSemiBold: require("../assets/fonts/BeVietnamPro/BeVietnamPro-SemiBold.ttf"),
    BeVNProBold: require("../assets/fonts/BeVietnamPro/BeVietnamPro-Bold.ttf"),
    BeVNProExtraBold: require("../assets/fonts/BeVietnamPro/BeVietnamPro-ExtraBold.ttf"),
  }).then((): void => {
    Typography.loadTypographies({
      h1: { fontSize: 24, fontFamily: "BeVNProSemiBold" },
      h2: { fontSize: 18, fontFamily: "BeVNProSemiBold" },
      strong: { fontSize: 14, fontFamily: "BeVNProBold" },
      regular: { fontSize: 14, fontFamily: "BeVNProSemiBold" },
      small: { fontSize: 10, fontFamily: "BeVNProExtraBold" },
    });
  });
}
