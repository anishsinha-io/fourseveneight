import React, { Fragment } from "react";

import BasicTabs from "./Tabs";

const Landing: React.FC = () => {
  return (
    <Fragment>
      <div className="landing-container">
        <BasicTabs />
      </div>
    </Fragment>
  );
};

export default Landing;
