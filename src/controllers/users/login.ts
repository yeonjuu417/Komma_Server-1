import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import passport from "passport";
import {signres} from "../../utils";

export default async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  passport.authenticate(//local strategy 호출 
    "local",
    (err: Error, data: object, info: object): Promise<void> => {
      signres(req, res, next, err, data, info, true);
      return;
    }
  )(req, res, next);
};