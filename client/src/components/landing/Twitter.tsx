import React, { Fragment } from "react";

import TwitterIcon from "@mui/icons-material/Twitter";

const Twitter: React.FC = () => {
  return (
    <Fragment>
      <div className="twitter-connect">
        <TwitterIcon />
        <div className="twitter-connect__message">
          <span>Connect twitter with fourseveneight</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Twitter;
