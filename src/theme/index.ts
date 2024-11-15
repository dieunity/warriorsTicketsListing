import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1D428A", // Dark blue
    },
    secondary: {
      main: "#FFE900", // Lighter yellow
    },
    warning: {
      main: "#FFC72C", // Darker yellow
    },
    background: {
      default: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#FFC72C",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#1D428A",
          "& th": {
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});

export default theme;
