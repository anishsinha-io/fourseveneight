//Implements JWT authentication strategy

import jwtStrategy from "passport-jwt";
import passport from "passport";
import fs from "fs";

import User, { IUser } from "../models/userModel";

interface IOptions {
  jwtFromRequest: jwtStrategy.JwtFromRequestFunction;
  secretOrKey: string;
}

const options = {} as IOptions;

export interface IJwtPayload {
  id: string;
  username: string;
  email: string;
}

options.jwtFromRequest = jwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = `${process.env.JWT_SECRET}`;

module.exports = (passport: passport.Authenticator) => {
  passport.use(
    new jwtStrategy.Strategy(
      options,
      async (
        jwt_payload: IJwtPayload,
        done: (param1: null | boolean, param2: boolean | string | IUser) => void
      ) => {
        try {
          const user = await User.findById(jwt_payload.id);
          if (user) return done(null, user);
          return done(null, false);
        } catch (err) {
          return err;
        }
      }
    )
  );
};
