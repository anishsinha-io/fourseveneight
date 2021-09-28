import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { ISocial, IProfile, IExperience, IEducation } from "./profileSlice";
import Spinner from "../spinner/Spinner";

const Settings: React.FC = () => {
  const profileStatus = useAppSelector((state) => state.profile.status);
  const currentUserProfile = useAppSelector((state) => state.profile.profile);
  const { firstName, lastName } = useAppSelector((state) => state.auth.user);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");

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
    education: currentUserProfile.education || ([] as IEducation[]),
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

  const fieldChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileState({ ...profileState, [e.target.name]: e.target.value });
  };
  const fileSelectedHandler = (e: any) => {
    const file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setImageUrl(objectURL);
    setImageAlt(`${firstName} ${lastName}'s profile`);
    setImage(file);
  };
  if (profileStatus === "loading") return <Spinner />;

  return (
    <Fragment>
      <form className="settings-container">
        <div className="settings-profile">
          <div className="settings-profile__main">
            <div className="file-input">
              <input type="file" onChange={fileSelectedHandler} />
              <img
                className="file-input__image"
                src={imageUrl || "#"}
                alt={imageAlt || ``}
              />
              <span className="button">Choose</span>
              <span className="label">
                {image ? image.name : "No file selected"}
              </span>
            </div>
            <div className="bio-text">
              <textarea
                value={bio}
                name="bio"
                className="bio-text__input"
                onChange={fieldChangeHandler}
              />
            </div>
          </div>
          <div className="settings-profile__bio"></div>
        </div>
        <div className="settings-general">
          <div className="settings-general__element">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              placeholder="company"
              onChange={fieldChangeHandler}
              value={company}
            />
          </div>
          <div className="settings-general__element">
            <input
              type="text"
              name="website"
              placeholder="website"
              onChange={fieldChangeHandler}
              value={website}
            />
          </div>
          <div className="settings-general__element">
            <input
              type="text"
              name="location"
              placeholder="location"
              onChange={fieldChangeHandler}
              value={location}
            />
          </div>
          <div className="settings-general__element">
            <input
              type="text"
              name="status"
              placeholder="status"
              onChange={fieldChangeHandler}
              value={status}
            />
          </div>
          <div className="settings-general__element">
            <input
              type="text"
              name="githubUsername"
              placeholder="githubUsername"
              onChange={fieldChangeHandler}
              value={githubUsername}
            />
          </div>
        </div>
        <div className="settings-social"></div>
        <div className="settings-education"></div>
        <div className="settings-experience"></div>
      </form>
    </Fragment>
  );
};

export default Settings;
