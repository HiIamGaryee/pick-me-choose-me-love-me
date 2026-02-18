import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    light: PaletteColor;
    dark: PaletteColor;
  }

  interface PaletteOptions {
    light?: PaletteColorOptions;
    dark?: PaletteColorOptions;
  }
}

const monospaceFont =
  "ui-monospace, 'Cascadia Code', 'Consolas', 'Monaco', monospace";

// Function to create a theme based on the mode
const getTheme = (mode: any) =>
  createTheme({
    palette: {
      mode,
      primary: {
        // Vibrant playful purple used for primary actions
        main: mode === "light" ? "#6C2BD9" : "#A78BFA",
        light: "#8B5CF6",
        dark: "#4C1D95",
        contrastText: "#e7eae5",
      },
      secondary: {
        // Pink accent used across headings/badges
        main: mode === "light" ? "#FF7AD9" : "#FFA8E9",
        light: "#FF9FE2",
        dark: "#E052B9",
        contrastText: "#2A0A4A",
      },
      light: {
        // Cloudy off-white with a hint of lavender for light surfaces
        main: "#F3EFFE",
        light: "#e7eae5",
        dark: "#E6DBFF",
      },
      dark: {
        // Deep playful purple for dark sections/backgrounds
        main: "#1B0B3A",
        light: "#3D2966",
        dark: "#12072A",
      },
      background: {
        default: mode === "light" ? "#1B0B3A" : "#0E0520",
        paper: mode === "light" ? "#F3EFFE" : "#1E1340",
      },
      error: {
        main: "#f44336", // Red for errors
        light: "#e57373",
        dark: "#d32f2f",
      },
      warning: {
        main: "#FFB34D", // Peachy orange for warnings
        light: "#ffb74d",
        dark: "#f57c00",
      },
      info: {
        main: mode === "light" ? "#5BC0FF" : "#9AD9FF", // Sky blue accent
        light: "#8FD6FF",
        dark: "#2AA4F4",
      },
      success: {
        main: "#8BE000", // Lime green accent
        light: "#A5EB33",
        dark: "#6BB300",
      },
    },
    shape: {
      // Larger rounded corners across the UI
      borderRadius: 24,
    },
    typography: {
      fontFamily: monospaceFont,
      h1: { fontFamily: monospaceFont },
      h2: { fontFamily: monospaceFont },
      h3: { fontFamily: monospaceFont },
      h4: { fontFamily: monospaceFont },
      h5: { fontFamily: monospaceFont },
      h6: { fontFamily: monospaceFont },
      subtitle1: { fontFamily: monospaceFont },
      button: { fontFamily: monospaceFont },
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 2,
        },
        styleOverrides: {
          root: {
            backgroundColor: "#F3EFFE",
            border: "1px solid #E6DBFF",
            borderRadius: "24px",
            padding: "20px",
            "&.table-paper": {
              boxShadow: "none",
              borderRadius: 0,
            },
          },
          rounded: { borderRadius: "24px" },
          outlined: {
            borderColor: "#E6DBFF",
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            border: "1px solid #3D2966",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #2A0A4A 0%, #3D2966 100%)",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: "#e7eae5",
            border: "none",
            "&.Mui-selected": {
              backgroundColor: "#6C2BD9",
              color: "#e7eae5",
            },
            "&:hover": {
              backgroundColor: "#4C1D95",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          contained: {
            background: "#6C2BD9",
            color: "#e7eae5",
            fontWeight: "bold",
            borderRadius: "999px",
            padding: "12px 20px",
            "&:hover": {
              background: "#4C1D95",
            },
            "&:focus": {
              background: "#4C1D95",
            },
          },
          text: {
            background: "transparent",
            color: "#6C2BD9",
            border: "1px solid #E6DBFF",
            borderRadius: "999px",
            padding: "10px 16px",
            "&:hover": {
              background: "rgba(108,43,217,0.06)",
            },
            "&:focus": {
              background: "rgba(108,43,217,0.06)",
            },
          },
          root: {
            textTransform: "none",
            borderRadius: "999px",
            "&:hover": {
              filter: "brightness(0.95)",
            },
            "&.Mui-disabled": {
              color: "#A6A6A6",
              background: "#2F2A43",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#e7eae5",
            padding: "24px",
            borderRadius: "24px",
            border: "1px solid #EDE7FF",
            height: "100%",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#2A0A4A",
          },
        },
      },
    },
  });

export default getTheme;
