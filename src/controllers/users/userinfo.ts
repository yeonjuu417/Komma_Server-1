import {  Request, Response } from "express";
import Playlist from "../../entity/Playlist";
import Savesong from "../../entity/Savesong";
import jwt from 'jsonwebtoken'
import { getManager } from "typeorm";


export default async (req: Request, res: Response) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        res.status(400).send({ "data": null, "message": "invalid access token" });
      } else {
        const token = authorization.split(' ')[1];// barer 빼고 토큰만 가져오기 
        const data:any = jwt.verify(token,process.env.ACCESS_SECRET);//토큰 유효한지 확인하는 작업 verify 토큰 내용 가져오기 
        console.log(data)

        const playlist = await getManager()
        .getRepository(Playlist)
        .createQueryBuilder("playlist")
        .leftJoinAndSelect("playlist.user", "playlist")
        .getMany();

        // const song = await getManager()
        // .createQueryBuilder(Savesong, "Savesong")
        // .where({ playList: playlist.id })
        // .getMany();


        res.status(200).send({
        "userInfo": { 
                id: data.id, 
                email: data.email,
                username: data.username,
                darkmode: data.darkMode,
                sitecolor: data.siteColor,
               },
       "playlists": playlist
        })
    }
}
