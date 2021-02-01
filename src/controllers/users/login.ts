import { Request, Response } from "express";
import User from "../../database/entity/User";
import { createHashedPassword } from "../../utils/HashedPassword";
import "dotenv/config";
import jwt from 'jsonwebtoken'

export default async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const user: any = await User.findOne({ email: email });
  if (!user) {
    res.status(400).send({ data: null, message: "not authorized" })
  } else {
    const { salt } = user;
    // 파라미터로 들어온 패스워드 Hashing하는 함수
    const { hashPwd } = await createHashedPassword(password, salt, res);
    const userInfo = await User.findOne({ password: hashPwd });

    if (!userInfo) {
      res.status(400).send({ data: null, message: "Passwords do not match" })
    } else {
      const accessToken = jwt.sign(
        {
          'id': userInfo.id,
          'username': userInfo.username,
          'email': userInfo.email,
          'siteColor': "random",
        },
        process.env.ACCESS_SECRET,
        { expiresIn: '1d' });//하루 뒤 파괴
      res.status(200).send({ accessToken: accessToken, message: "Login successfully" })
    }
  }
};
