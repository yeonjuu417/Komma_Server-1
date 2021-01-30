import { Request, Response } from "express";
import Playlist from "../../database/entity/Playlist";

export default async (req: Request, res: Response) => {
  const tokenId = res.locals.id;
  const { id, title } = req.body;
  if (!tokenId) {
    res.status(400).send({ "data": null, "message": "invalid access token" });
  } else {
    Playlist.changeTitle(id, tokenId, { title: title });
    res.status(302).send({ "message": "update successfully" })
  }
}