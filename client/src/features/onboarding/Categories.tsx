import React, { Fragment, useContext } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CategoryCard from "./CategoryCard";
import { onboardContext } from "./Onboarding";
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

const Categories: React.FC = () => {
  const preferencesContext = useContext(onboardContext);
  //To add more categories, add an element to this array and create an image in the
  //AWS S3 bucket called `fse-category-{the new category name}`
  const possibleCategories: string[] = [
    "computer science",
    "history",
    "entertainment",
    "mathematics",
    "politics",
    "public health",
    "economics",
    "language",
    "law",
    "business",
    "ethics",
    "music",
    "sports",
    "philosophy",
    "nature",
    "food and drink",
    "mass media",
    "education",
    "film",
    "universe",
    "geography",
    "finance",
    "engineering",
    "humanities",
  ];

  const categoryCards = possibleCategories.map((category: string) => {
    return <CategoryCard key={category} category={category} />;
  });

  console.log(categoryCards);

  return (
    <Fragment>
      <div className="categories-main">
        <div className="categories-main__title">
          <h3>Select categories you're interested in</h3>
        </div>
        <div className="categories-main__options">{categoryCards}</div>
        <ThemeProvider theme={theme}>
          <Button color="confirm" variant="outlined">
            Confirm Selection
          </Button>
        </ThemeProvider>
      </div>
    </Fragment>
  );
};

export default Categories;
