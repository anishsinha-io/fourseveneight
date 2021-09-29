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

  const [itemStyle, setItemStyle] = useState<string>("posts");
  const profile = useAppSelector((state) => state.profile.profile);

  const status = useAppSelector((state) => state.auth.status);

  if (status === "loading") return <Spinner />;

  return (
    <Fragment>
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="card__header">
            <img
              src="http://localhost:8000/api/posts/downloads/image/default_background"
              alt="default background"
            />
          </div>
          <div className="card__image card__image-user">
            <img
              className="card__image-user"
              src="http://localhost:8000/api/posts/downloads/image/fse-default-profile"
              alt="default profile"
            />
          </div>
          <div className="card__info">
            <div className="details">
              <span className="details__text-header">
                <h3>User</h3>
              </span>
              <span className="details__text-subheader">React dev</span>
            </div>
            <div className="card__info-tabs"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
