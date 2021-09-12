//Implements generic template functions

import { RequestHandler } from "express";
import slugify from "slugify";

import Profile, { IExperience, IEducation } from "../../models/profileModel";
import { IUser } from "../../models/userModel";
import * as security from "../../auth/security";

//Profiles

export const addGenericProfileField =
  (
    typeInterface: IExperience | IEducation,
    slugField: string,
    field: string,
    ...allowedParams: string[]
  ): RequestHandler =>
  async (req, res) => {
    try {
      const user = req.user as IUser;
      const filteredBody: security.Body = security.sanitizeBody(
        req.body,
        ...allowedParams
      );
      const genericFieldObject = filteredBody as typeof typeInterface;

      let finalObject;
      if (slugField === "company") {
        const profileObject = genericFieldObject as IExperience;
        if (profileObject.company) {
          profileObject.slug = slugify(
            `${profileObject.company}-${profileObject.title}`,
            { lower: true }
          );
          finalObject = profileObject as IExperience;
        } else throw new Error();
      } else if (slugField === "school") {
        const profileObject = genericFieldObject as IEducation;
        if (profileObject.school) {
          profileObject.slug = slugify(
            `${profileObject.school}-${profileObject.degree}`,
            { lower: true }
          );
          finalObject = profileObject as IEducation;
        } else throw new Error();
      }

      try {
        const profile = await Profile.findOne({ user: user.id });
        if (profile) {
          profile.get(field)!.unshift(finalObject);
          await profile.save();
          return res.status(200).json({ profile });
        }
      } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

export const removeGenericProfileField =
  (typeInterface: IExperience | IEducation, field: string): RequestHandler =>
  async (req, res) => {
    const user: IUser = req.user as IUser;
    try {
      const profile = await Profile.findOne({ user: user.id });
      if (profile) {
        const removeIndex: number | undefined = profile
          .get(field)
          ?.map((item: typeof typeInterface) => item.slug)
          .indexOf(req.params[`${field}Slug`]);
        if (removeIndex !== undefined)
          profile.get(field)?.splice(removeIndex, 1);
        await profile.save();
        return res.status(200).json({ profile });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
