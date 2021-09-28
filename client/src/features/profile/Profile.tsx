import React, { Fragment, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProfileFromQuery } from "./profileSlice";
import Spinner from "../spinner/Spinner";

const Profile = ({ match }: RouteComponentProps<{ username?: string }>) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (match.params.username) {
      dispatch(fetchProfileFromQuery(match.params.username));
    }
  }, [dispatch, match.params.username]);

  const currentUser = useAppSelector((state) => state.auth.user);
  const profileUser = useAppSelector((state) => state.profile.profile.user);

  const status = useAppSelector((state) => state.auth.status);

  if (status === "loading") return <Spinner />;

  return (
    <Fragment>
      <div className="profile-container">
        <div className="profile-container__background">Background Image</div>
        <div className="profile-container__main">Profile main</div>
        <div className="profile-container__buttons">Buttons</div>
        <div className="profile-container__component">Component</div>
      </div>
    </Fragment>
  );
};

export default Profile;
