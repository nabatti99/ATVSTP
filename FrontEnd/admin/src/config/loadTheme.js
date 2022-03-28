import { createTheme } from "@mui/material/styles";
import "@fontsource/be-vietnam-pro";

const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: 64,
      letterSpacing: "-0.05em",
    },

    h2: {
      fontWeight: 700,
      fontSize: 48,
      letterSpacing: "-0.05em",
    },

    h3: {
      fontWeight: 700,
      letterSpacing: "-0.05em",
    },

    h4: {
      fontWeight: 600,
      fontSize: 24,
    },

    h5: {
      fontWeight: 600,
      fontSize: 16,
    },

    regular: {
      fontWeight: 500,
      fontSize: 14,
    },

    strong: {
      fontWeight: 700,
      fontSize: 14,
    },

    small: {
      fontWeight: 700,
      fontSize: 10,
    },
  },

  palette: {
    white: "#FFFFFF",
    black: "#000000",

    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
    red: {
      50: "#FFF5F5",
      100: "#FED7D7",
      200: "#FEB2B2",
      300: "#FC8181",
      400: "#F56565",
      500: "#E53E3E",
      600: "#C53030",
      700: "#9B2C2C",
      800: "#822727",
      900: "#63171B",
    },
    green: {
      50: "#F0FFF4",
      100: "#C6F6D5",
      200: "#9AE6B4",
      300: "#68D391",
      400: "#48BB78",
      500: "#38A169",
      600: "#2F855A",
      700: "#276749",
      800: "#22543D",
      900: "#1C4532",
    },
    blue: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1A365D",
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: [
          '"Be Vietnam Pro"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(", "),
      },
    },

    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
          zIndex: 1,
        },
        elevation2: {
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
          zIndex: 2,
        },
        elevation3: {
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          zIndex: 3,
        },
        elevation4: {
          boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
          zIndex: 4,
        },
        elevation5: {
          boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
          zIndex: 5,
        },
        elevation6: {
          boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1)",
          zIndex: 6,
        },
        elevation7: {
          boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
          zIndex: 7,
        },
      },
    },
  },
});

theme.components.MuiAvatar = {
  styleOverrides: {
    root: ({ ownerState, theme }) => {
      const borderColor = ownerState.borderColor.split(".").reduce((result, key) => result[key], theme.palette);
      return {
        border: `${ownerState.border}px solid ${borderColor}`,
      };
    },
  },
};

export default theme;
