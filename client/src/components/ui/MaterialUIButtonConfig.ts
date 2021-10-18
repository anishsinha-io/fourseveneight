import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    confirm: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    confirm?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    confirm: true;
  }
}

export const theme = createTheme({
  palette: {
    confirm: {
      main: "#000",
      contrastText: "#000",
    },
  },
});
