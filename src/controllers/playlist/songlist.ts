import { Request, Response } from "express";
import Songlist from "../../database/entity/Songlist";

export default async (req: Request, res: Response) => {
  await Songlist.find()
  .then(data => {
    res.status(200).send({ "songlist": data })})
}