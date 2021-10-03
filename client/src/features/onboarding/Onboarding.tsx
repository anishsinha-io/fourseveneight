import React, { Fragment, useContext } from "react";
import { Redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAppSelector } from "../../app/hooks";
import Categories from "./Categories";

export interface IOnboard {
  categories: string[];
  selectedCategories: boolean;
  showCategories: boolean;
}
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

const IOnboardInitialState: IOnboard = {
  categories: [] as string[],
  selectedCategories: false,
  showCategories: true,
};

export const onboardContext =
  React.createContext<IOnboard>(IOnboardInitialState);

export interface INewUserPreferences {}

const Onboarding = () => {
  const isOnboarded = useAppSelector((state) => state.auth.user.isOnboarded);
  const preferencesContext = useContext(onboardContext);

  if (isOnboarded) return <Redirect to="/" />;

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(preferencesContext.categories);
  };

  return (
    <Fragment>
      <div className="onboarding-main">
        {preferencesContext.showCategories && <Categories />}
        {preferencesContext.selectedCategories && (
          <ThemeProvider theme={theme}>
            <Button
              color="confirm"
              variant="outlined"
              onClick={handleFormSubmit}
            >
              submit
            </Button>
          </ThemeProvider>
        )}
      </div>
    </Fragment>
  );
};

export default Onboarding;
