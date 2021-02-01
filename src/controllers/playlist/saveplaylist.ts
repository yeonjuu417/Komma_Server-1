import { Request, Response } from "express";
import { Playlist, Savesong } from "../../database/entity";
import { addPlayListId } from "../../utils/AddPlayListId";

export default async (req: Request, res: Response) => {
  const { title, savesongs, icon } = req.body;
  const tokenId = res.locals.id;
  if (!tokenId) {
    res.status(400).send({ "data": null, "message": "invalid access token" });
  } else {
    await Playlist.insertInfo({
      title: title,
      icon: icon,
      user: tokenId
    }).then(data => {
      /**
       * playlist에 playlistId를 넣어주기 위한 함수
       * playlist 테이블과 join을 하기위해 savesong테이블의 playlistId 컬럼에 playlist.id를 넣어줌
       * */
      const addIdSaveSong = addPlayListId(savesongs, data);
      Savesong.insertInfo(addIdSaveSong);
    })

    res.status(200).send({ message: "Save playList Successfully" })
  }
}
