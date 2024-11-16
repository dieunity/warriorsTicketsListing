import { createTheme } from "@mui/material/styles";

export const colors = {
  darkBlue: "#1D428A",
  lightYellow: "#FFE900",
  darkYellow: "#FFC72C",
  white: "#FFFFFF",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.darkBlue,
    },
    secondary: {
      main: colors.lightYellow,
    },
    warning: {
      main: colors.darkYellow,
    },
    background: {
      default: colors.white,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&:hover": {
            backgroundColor: colors.darkYellow,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkBlue,
          "& th": {
            color: colors.white,
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkBlue, // Background of the button
          color: colors.white, // Text/icon color
          "& a": {
            color: "inherit",
          },
          "&:hover": {
            backgroundColor: colors.lightYellow, // Hover background color
            color: colors.darkBlue, // Hover text/icon color
            "& a": {
              color: "inherit",
            },
          },
        },
      },
    },
  },
});

export default theme;
