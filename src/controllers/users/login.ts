import { Request, Response } from "express";
import { getManager } from "typeorm";
import User from "../../entity/User";
import crypto from "crypto";
import "dotenv/config";

export default async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  const user = await getManager()
    .createQueryBuilder(User, "User")
    .where({ email: email })
    .getOne();

  if (!user) {
    res.status(400).send({ data: null, message: "not authorized" })
  } else {
    const { salt } = user;

    const createHashedPassword = (plainpassword) =>
      new Promise(async (resolve, reject) => {
        crypto.pbkdf2(plainpassword, salt, 1000, 64, 'sha512', (err, key) => {
          if (err) reject(res.status(400).send({ message: "hashPwd exists" }));
          resolve(key.toString('base64'));
        });
      });
    const hashPwd = await createHashedPassword(password);

    await getManager()
    .createQueryBuilder(User, "User")
    .where({ password: password })
    .getOne()
    .then(data => {
      // res.send({message : "Login successfully" })
    })
  }
};
