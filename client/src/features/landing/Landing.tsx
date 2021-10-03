import React, { Fragment } from "react";

import Sidebar from "./Sidebar";
import BasicTabs from "./Tabs";

const Landing: React.FC = () => {
  return (
    <Fragment>
      <div className="landing-container">
        <BasicTabs />
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default Landing;
