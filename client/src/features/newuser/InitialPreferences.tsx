import React, { Fragment, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Preferences from "./Preferences";

export interface INewUserContext {
  categoryPreferences: string[];
}

export const NewUserContext = React.createContext<INewUserContext>({
  categoryPreferences: [] as string[],
});

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

const theme = createTheme({
  palette: {
    confirm: {
      main: "#000",
      contrastText: "#000",
    },
  },
});

const InitialPreferences: React.FC = () => {
  const newUserContext = useContext(NewUserContext);
  const [showPreferenceCards, setShowPreferenceCards] = useState<boolean>(true);
  const [showSubpreferenceChips, setShowSubpreferenceChips] =
    useState<boolean>(false);
  const handlePreferenceSelection = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowPreferenceCards(false);
    console.log(newUserContext.categoryPreferences);
  };

  return (
    <Fragment>
      <div className="onboarding-main">
        {showPreferenceCards && (
          <div>
            <Preferences />
          </div>
        )}
        {showPreferenceCards && (
          <ThemeProvider theme={theme}>
            <Button
              color="confirm"
              variant="outlined"
              onClick={handlePreferenceSelection}
            >
              Confirm Selection
            </Button>
          </ThemeProvider>
        )}
      </div>
    </Fragment>
  );
};

export default InitialPreferences;
