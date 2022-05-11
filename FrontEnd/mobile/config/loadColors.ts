import { Colors, Schemes } from "react-native-ui-lib";

type DesignSystemColors = Record<string, string>;

export default function loadColors() {
  const baseColors: DesignSystemColors = {
    green700: "#276749",
    green500: "#38A169",
    green100: "#C6F6D5",
    yellow400: "#ECC94B",
    gray700: "#2D3748",
    gray500: "#718096",
    gray50: "#F7FAFC",
    white: "#FFFFFF",
  };

  const colorSchemes: Schemes = {
    light: {
      bg: baseColors.gray50,
      cardBg: baseColors.white,
      textColor: baseColors.gray500,
      headingColor: baseColors.gray700,
    },
    dark: {
      bg: baseColors.gray700,
      cardBg: baseColors.gray500,
      textColor: baseColors.gray50,
      headingColor: baseColors.white,
    },
  };

  Colors.loadColors(baseColors);
  Colors.loadSchemes(colorSchemes);
}
