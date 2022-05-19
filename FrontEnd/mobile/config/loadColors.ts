import { Colors, Schemes } from "react-native-ui-lib";

type DesignSystemColors = Record<string, string>;

export default function loadColors() {
  const baseColors: DesignSystemColors = {
    green700: "#276749",
    green500: "#38A169",
    green100: "#C6F6D5",
    red700: "#9B2C2C",
    red500: "#E53E3E",
    red100: "#FFF5F5",
    yellow400: "#ECC94B",
    gray700: "#2D3748",
    gray500: "#718096",
    gray50: "#F7FAFC",
    white: "#FFFFFF",
  };

  const colorSchemes: Schemes = {
    light: {
      bgPrimary: baseColors.gray50,
      bgSecondary: baseColors.white,
      textPrimary: baseColors.gray500,
      textSecondary: baseColors.gray700,
    },
    dark: {
      bgPrimary: baseColors.gray700,
      bgSecondary: baseColors.gray500,
      textPrimary: baseColors.gray50,
      textSecondary: baseColors.white,
    },
  };

  Colors.loadColors(baseColors);
  Colors.loadSchemes(colorSchemes);
}
