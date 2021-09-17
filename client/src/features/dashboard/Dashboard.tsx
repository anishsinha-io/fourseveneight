import React from "react";

// import Posts from "../post/Posts";

import Following from "./Following";
import Questions from "./Questions";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-posts">{/* <Posts /> */}</div>
      <div className="dashboard-tabs">
        <Following />
        <Questions />
      </div>
    </div>
  );
};

export default Dashboard;
