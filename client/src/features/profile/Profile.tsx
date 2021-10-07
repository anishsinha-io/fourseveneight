import React, { Fragment, useEffect } from "react";
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

  const status = useAppSelector((state) => state.auth.status);
  const profile = useAppSelector((state) => state.profile.profile);

  if (status === "loading") return <Spinner />;

  return (
    <Fragment>
      <div className="profile-wrapper">
        <div className="profile-main">
          <div className="profile-main__head">
            <div className="head__background">
              <img
                src="http://localhost:8000/api/media/image/default_background"
                alt="background"
              />
            </div>
            <div className="head__image">
              <img
                className="image-profile"
                src="http://localhost:8000/api/media/image/fse-default-profile"
                alt="profile"
              />
            </div>
          </div>
          <div className="profile-main__meta">
            <div className="meta__user">
              <div className="meta__user-username">@{profile.username}</div>
              <div className="meta__user-name">{profile.user.firstName}</div>
            </div>
            <div className="meta__bio">{profile.bio}</div>
          </div>
          <div className="profile-main__tabs"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
