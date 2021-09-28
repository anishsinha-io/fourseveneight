//Implements controllers for profile api endpoints

import { RequestHandler } from "express";

import { Body } from "../../auth/security";
import * as factory from "./handlerFactory";
import * as security from "../../auth/security";
import { IUser } from "../../models/userModel";
import Profile, {
  IExperience,
  IEducation,
  IProfile,
  ISocial,
} from "../../models/profileModel";
import { HeadObjectRequest } from "@aws-sdk/client-s3";

export const removeProfileExperience: RequestHandler =
  factory.removeGenericProfileField({} as IExperience, "experience");

export const removeProfileEducation: RequestHandler =
  factory.removeGenericProfileField({} as IEducation, "education");

export const addProfileExperience: RequestHandler =
  factory.addGenericProfileField(
    {} as IExperience,
    "company",
    "experience",
    "company",
    "experience",
    "title",
    "company",
    "location",
    "from",
    "to",
    "current",
    "description"
  );

export const addProfileEducation: RequestHandler =
  factory.addGenericProfileField(
    {} as IEducation,
    "school",
    "education",
    "school",
    "degree",
    "fieldOfStudy",
    "from",
    "to",
    "current",
    "description"
  );

export const createProfile: RequestHandler = async (req, res) => {
  const user = req.user as IUser;
  const profileObject: Body = security.sanitizeBody(
    req.body,
    "company",
    "website",
    "location",
    "bio",
    "status",
    "githubUsername",
    "skills",
    "youtube",
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "tiktok"
  );

  let profileFields = {} as IProfile;
  profileFields.social = {} as ISocial;

  profileFields.user = user.id;

  if (profileObject.company) profileFields.company = profileObject.company;
  if (profileObject.website) profileFields.website = profileObject.website;
  if (profileObject.location) profileFields.location = profileObject.location;
  if (profileObject.bio) profileFields.bio = profileObject.bio;
  if (profileObject.status) profileFields.status = profileObject.status;
  if (profileObject.githubUsername)
    profileFields.githubUsername = profileObject.githubUsername;
  if (profileObject.skills)
    profileFields.skills = profileObject.skills
      .split(",")
      .map((skill: string) => skill.trim());

  if (profileObject.twitter)
    profileFields.social.twitter = profileObject.twitter;
  if (profileObject.youtube)
    profileFields.social.youtube = profileObject.youtube;
  if (profileObject.facebook)
    profileFields.social.facebook = profileObject.facebook;
  if (profileObject.instagram)
    profileFields.social.instagram = profileObject.instagram;
  if (profileObject.linkedin)
    profileFields.social.linkedin = profileObject.linkedin;
  if (profileObject.tiktok) profileFields.social.tiktok = profileObject.tiktok;

  try {
    const profile = await Profile.findOne({ user: user.id });
    if (profile) {
      await Profile.findOneAndUpdate(
        { user: user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json({ msg: "Profile updated successfully" });
    }
    const newProfile = new Profile(profileFields);
    console.log(newProfile);
    await newProfile.save();
    return res.status(201).json({ msg: "Profile created successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

//Returns empty profile if user has not created one
export const getUserProfile: RequestHandler = async (req, res) => {
  const user = req.user as IUser;
  try {
    const profile = await Profile.findOne({ user: user.id });
    if (profile) return res.status(200).json({ profile });
    return res.status(404).json({ msg: "Profile not found!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

//todo refactor+rewrite
export const clearUserProfile: RequestHandler = async (req, res) => {
  const user: IUser = req.user as IUser;
  try {
    const profile = await Profile.findOne({ user: user.id });
    if (profile) {
      await Profile.findOneAndUpdate(
        { user: user.id },
        {
          $set: {
            experience: [],
            education: [],
            skills: [],
            company: "",
            githubUsername: "",
            website: "",
            location: "",
            status: "",
            bio: "",
            social: {} as ISocial,
          },
        },
        { new: true }
      );
      return res.status(200).json({ profile });
    }
    return res.status(404).json({ msg: "Profile not found" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getProfileFromQuery: RequestHandler = async (req, res) => {
  try {
    const queriedUser = req.params.username;
    const profile = await Profile.findOne({ username: queriedUser });
    return res.status(200).json({ profile });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
