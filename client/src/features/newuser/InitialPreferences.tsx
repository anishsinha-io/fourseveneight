import React, { Fragment, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { Redirect } from "react-router";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { theme } from "../ui/MaterialUIButtonConfig";
import Preferences from "./Preferences";
import SetupProfile from "./SetupProfile";
import { createProfile } from "../profile/profileSlice";

export interface INewUserContext {
  categoryPreferences: string[];
  employmentStatus: string;
  jobTitle: string;
  website: string;
  github: string;
  bio: string;
  skills: string[];
  location: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  youtube: string;
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
  facebook: "",
  twitter: "",
  linkedin: "",
  tiktok: "",
  instagram: "",
  youtube: "",
});

const InitialPreferences: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showPreferenceCards, setShowPreferenceCards] = useState<boolean>(true);
  const [showSetupProfile, setShowSetupProfile] = useState<boolean>(false);
  const newUserContext = useContext(NewUserContext);

  const isOnboarded = useAppSelector((state) => state.auth.user.onboarded);
  if (isOnboarded) return <Redirect to="/" />;
  const handlePreferenceSelection = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowPreferenceCards(false);
    setShowSetupProfile(true);
  };

  const handleSetupSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("here");
    dispatch(createProfile(newUserContext));
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
        {showSetupProfile && (
          <ThemeProvider theme={theme}>
            <Button
              color="confirm"
              variant="outlined"
              onClick={handleSetupSubmit}
            >
              Submit
            </Button>
          </ThemeProvider>
        )}
      </div>
    </Fragment>
  );
};

export default InitialPreferences;
