import React, { Fragment } from "react";
import spinner from "../../assets/LoadingSpinner.gif";

const Spinner: React.FC = () => (
  <Fragment>
    <div className="spinner-container">
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  </Fragment>
);

export default Spinner;
