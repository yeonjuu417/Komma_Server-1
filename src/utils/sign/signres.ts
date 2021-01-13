import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
  err: Error,
  user: any,
  info?: object,
  isLocal?: boolean
): Promise<void> => {
  if (err || info) {
    if (err) {
      next(err);
    } else {
      res.status(400).send(info);
      return;
    }
  }
  req.login(user, { session: false }, (err) => {
    err ? next(err) : null;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.cookie("token", token);
    const { username } = user;

    if (isLocal) {
      const { username } = user;
      res.status(200).send({
        username,
      });
    } else {
      res.redirect("/");
      return;
    }
  });
};