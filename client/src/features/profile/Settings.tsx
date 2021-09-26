import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  fetchUserProfile,
  ISocial,
  IProfile,
  IExperience,
  IEducation,
} from "./profileSlice";
import Spinner from "../spinner/Spinner";

const Settings: React.FC = () => {
  const profileStatus = useAppSelector((state) => state.profile.status);
  const currentUserProfile = useAppSelector((state) => state.profile.profile);

  const [profileState, setProfileState] = useState({
    photo: currentUserProfile.photo || "",
    company: currentUserProfile.company || "",
    website: currentUserProfile.website || "",
    location: currentUserProfile.location || "",
    status: currentUserProfile.status || "",
    skills: currentUserProfile.skills || ([] as string[]),
    bio: currentUserProfile.bio || "",
    githubUsername: currentUserProfile.githubUsername || "",
    experience: currentUserProfile.experience || ([] as IExperience[]),
    education: currentUserProfile.education || ([] as IEducation),
    social: currentUserProfile.social || ({} as ISocial),
  });
  const {
    photo,
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubUsername,
    experience,
    education,
    social,
  } = profileState;

  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileState({ ...profileState, [e.target.name]: e.target.value });
  };

  if (profileStatus === "loading") return <Spinner />;

  return (
    <Fragment>
      <div className="settings-container">
        <div className="settings-general">
          <div className="settings-general__company">
            <input
              type="text"
              name="company"
              placeholder="company"
              className="settings-general__element"
              onChange={fieldChangeHandler}
              value={company}
            />
          </div>
          <div className="settings-general__element">
            <input
              type="text"
              name="website"
              placeholder="website"
              className="settings-general__element"
              onChange={fieldChangeHandler}
              value={website}
            />
          </div>
          <div className="settings-general__element">
            <input
              type="text"
              name="location"
              placeholder="location"
              className="settings-general__website"
              onChange={fieldChangeHandler}
              value={location}
            />
          </div>
          <div className="settings-general__element">
            <input
              type="text"
              name="status"
              placeholder="status"
              className="settings-general__website"
              onChange={fieldChangeHandler}
              value={status}
            />
          </div>
          <div className="settings-general__element">
            <input
              type="text"
              name="githubUsername"
              placeholder="githubUsername"
              className="settings-general__website"
              onChange={fieldChangeHandler}
              value={githubUsername}
            />
          </div>
        </div>
        <div className="settings-social"></div>
        <div className="settings-education"></div>
        <div className="settings-experience"></div>
      </div>
    </Fragment>
  );
};

export default Settings;
