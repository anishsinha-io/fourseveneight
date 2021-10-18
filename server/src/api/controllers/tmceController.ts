import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

import { IUser } from "../../models/userModel";

export const getJwt: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    console.log(user);
    console.log("here");
    const payload = {
      sub: user.username,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };

    // if (config.scopeUser) {
    //   payload["https://claims.tiny.cloud/drive/root"] = `/${user.username}`;
    // }

    const rsaPrivateKey: string | undefined = process.env.TMCE_JWT_SECRET;
    if (!rsaPrivateKey) throw new Error("RSA Private Key is not defined");

    try {
      const token = jwt.sign(payload, rsaPrivateKey, { algorithm: "RS256" });
      return res.status(200).json({ token });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getApiKey: RequestHandler = async (req, res) => {
  try {
    const apiKey = `${process.env.TMCE_API_KEY}`;
    if (!apiKey)
      return res.status(404).json({ msg: "Missing or invalid api key!" });

    return res.status(200).json({ apiKey });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
