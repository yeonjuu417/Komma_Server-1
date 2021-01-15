import { Request, Response } from "express";
import Playlist from "../../entity/Playlist";
import Usersiteoption from "../../entity/Usersiteoption";
import Savesong from "../../entity/Savesong";
import jwt from 'jsonwebtoken'
import { getManager } from "typeorm";


export default async (req: Request, res: Response) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    res.status(400).send({ "data": null, "message": "invalid access token" });
  } else {
    const token = authorization.split(' ')[1];// barer 빼고 토큰만 가져오기 
    const data: any = jwt.verify(token, process.env.ACCESS_SECRET);//토큰 유효한지 확인하는 작업 verify 토큰 내용 가져오기 
    console.log(data)

    const siteoption = await getManager()
      .createQueryBuilder(Usersiteoption, "Usersiteoption")
      .where({ userid: data.id })
      .getOne();

    const playlist = await getManager()
      .createQueryBuilder(Playlist, "Playlist")
      .where({ userid: data.id })
      .getOne();

    const song: Array<any> = await getManager()
      .createQueryBuilder(Savesong, "Savesong")
      .where({ playList: playlist.id })
      .getMany();


    // 유저한명에 대해서 플레이리스트도 여러개 존재
    // 한개의 플레이리스트에 대해서도 여러곡 존재 
    // 나타내는법 ... 

    res.status(200).send({
      "userInfo": {
        id: data.id,
        email: data.email,
        username: data.username
      },
      "userSetting": {
        darkmode: siteoption.darkMode,
        sitecolor: siteoption.siteColor,
      },
      "playlists": {
        "id": playlist.id,
        "title": playlist.title,
        "list": song

        //    {
        //      id: song.id,
        //      title: song.title,
        //      soundFile: song.soundFile,
        //      customVolume: song.customVoulume,
        //    },
      }
    })
  }
}
