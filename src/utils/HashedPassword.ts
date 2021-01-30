import crypto from "crypto";
import { Response } from "express";

export const createSalt: Function = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  });
};

export const createHashedPassword: Function = (plainpassword: string, salt: string, res: Response) => {
  return new Promise(async (resolve, reject) => {
    crypto.pbkdf2(plainpassword, salt, 1000, 64, 'sha512', (err, key) => {
      if (err) reject(res.status(400).send({ message: "hashPwd exists" }));
      resolve({ hashPwd: key.toString("base64"), salt });
    });
  })
};
