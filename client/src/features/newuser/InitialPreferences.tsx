import React, { Fragment, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Preferences from "./Preferences";
import SetupProfile from "./SetupProfile";

export interface INewUserContext {
  categoryPreferences: string[];
  employmentStatus: string;
  jobTitle: string;
  website: string;
  github: string;
  bio: string;
  skills: string[];
  location: string;
}

export const NewUserContext = React.createContext<INewUserContext>({
  categoryPreferences: [] as string[],
  employmentStatus: "",
  jobTitle: "",
  website: "",
  github: "",
  bio: "",
  skills: [],
  location: "",
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
  const [showPreferenceCards, setShowPreferenceCards] = useState<boolean>(true);
  const [showSetupProfile, setShowSetupProfile] = useState<boolean>(false);
  const handlePreferenceSelection = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowPreferenceCards(false);
    setShowSetupProfile(true);
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
        {showSetupProfile && <SetupProfile />}
      </div>
    </Fragment>
  );
};

export default InitialPreferences;
