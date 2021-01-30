import { Request, Response } from "express";
import User from "../../database/entity/User";
import { createSalt, createHashedPassword } from "../../utils/HashedPassword";

export default async (req: Request, res: Response) => {
  const { username, password, sitecolor } = req.body;
  const tokenId = res.locals.id;
  //사이트 배경색상 수정
  if (sitecolor) {
    const result = await User.changeInfo(tokenId, { siteColor: sitecolor })
    res.status(200).send({ "siteColor": result.siteColor, "message": "update successfully" })
  }
  //이름 수정
  else if (username) {
    const result = await User.changeInfo(tokenId, { username: username })
    res.status(200).send({ "username": result.username, "message": "update successfully" })
  }
  //패스워드 수정
  else if (password) {
    // HashPwd & salt 값 생성
    const { hashPwd, salt } = await createSalt()
      .then((salt: string) => {
        return createHashedPassword(password, salt, res)
      });
    await User.changeInfo(tokenId, { password: hashPwd, salt: salt })
    res.status(200).send({ "message": "update password successfully" })
  }
}
