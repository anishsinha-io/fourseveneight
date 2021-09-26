import React, { Fragment, useEffect, useState } from "react";

// import Posts from "../post/Posts";

import Settings from "./Settings";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUserProfile } from "./profileSlice";
import Spinner from "../spinner/Spinner";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showSettings, setShowSettings] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  const profile = useAppSelector((state) => state.profile.profile);
  const profileStatus = useAppSelector((state) => state.profile.status);
  const showSettingsHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSettings(true);
  };
  if (profileStatus === "loading") return <Spinner />;
  return (
    <Fragment>
      <div className="dashboard">
        <Settings />
      </div>
    </Fragment>
  );
};

export default Dashboard;
