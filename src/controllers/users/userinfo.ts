import { Request, Response } from "express";
import { getManager } from "typeorm";
import User from "../../database/entity/User";

export default async (req: Request, res: Response): Promise<void> => {
  const tokenId = res.locals.id;
  //유저 정보와 유저가 저장한 각 플레이리스트에 저장된 노래를 join으로 선택
  const UserInfo = await getManager()
    .createQueryBuilder(User, "user")
    .innerJoinAndSelect("user.playlists", "playlist")
    .innerJoinAndSelect("playlist.savesongs", "savesong")
    .where("user.id = :id", { id: tokenId })
    .getOne()
  // playlist가 없는 유저
  if (!UserInfo) {
    await getManager()
      .createQueryBuilder(User, "user")
      .where({ id: tokenId })
      .getOne()
      .then(UserInfo => {
        res.status(200).send({
          "userInfo": {
            id: UserInfo.id,
            email: UserInfo.email,
            username: UserInfo.username,
            sitecolor: UserInfo.siteColor,
          }
        })
      })
  }
  // playlist가 있는 유저 정보
  else {
    res.status(200).send({
      "userInfo": {
        id: UserInfo.id,
        email: UserInfo.email,
        username: UserInfo.username,
        sitecolor: UserInfo.siteColor,
      },
      "playlists": UserInfo.playlists
    })
  }
}
