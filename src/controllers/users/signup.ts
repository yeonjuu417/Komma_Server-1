import { Request, Response } from "express";
import User from "../../database/entity/User";
import { createSalt, createHashedPassword } from "../../utils/HashedPassword";

export default async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  // 필수 입력 사항이 req.body로 제대로 들어왔는지 확인
  if (!email || !password || !username) {
    res.status(422).send({ message: "insufficient parameters supplied" });
  }
  // 이메일 중복 체크
  const isemail: any = await User.findOne({ email: email });

  if (isemail) {
    res.status(409).send({ message: "email exists" });
  } else {
    // HashPwd & salt 값 생성
    const { hashPwd, salt } = await createSalt()
    .then((salt: string) => {
      return createHashedPassword(password, salt, res)
    });
    // 유저 정보 DB 생성
    User.insertInfo({
      email: email,
      password: hashPwd,
      username: username,
      siteColor: "blue",
      salt: salt,
    })
    res.status(201).send({ message: "Sign successfully" });
  }
};
