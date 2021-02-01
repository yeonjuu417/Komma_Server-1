import { Request, Response } from "express";
import Playlist from "../../database/entity/Playlist";

export default async (req: Request, res: Response) => {
  const tokenId = res.locals.id;
  const { id } = req.body;
  if (!tokenId) {
    res.status(400).send({ "data": null, "message": "invalid access token" });
  } else {
    Playlist.deletePlayList(id, tokenId);
    res.status(200).send({ "message": "Delete playlist Successfully" });
  }
}