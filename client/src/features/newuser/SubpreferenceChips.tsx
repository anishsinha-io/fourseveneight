import React, { Fragment, useContext } from "react";
import { Chip } from "@material-ui/core";

import { NewUserContext } from "./InitialPreferences";
import api from "../../app/api";

const SubpreferenceChips: React.FC = () => {
  const newUserContext = useContext(NewUserContext);

  return (
    <Fragment>
      <div></div>
    </Fragment>
  );
};

export default SubpreferenceChips;
