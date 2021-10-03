import React, { Fragment } from "react";

import Twitter from "./Twitter";
import Recommended from "./Recommended";

const Sidebar = () => {
  return (
    <Fragment>
      <div className="landing-sidebar">
        <Twitter />
        <Recommended />
      </div>
    </Fragment>
  );
};

export default Sidebar;
