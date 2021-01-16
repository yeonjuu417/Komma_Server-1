import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../../entity/User";
import { getConnection } from "typeorm";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
  const authorization = req.headers['authorization'];
  const { username, password, darkMode, siteColor } = req.body;
  //const {red, violet, blue, cyan, teal, lime, yellow, orange, random} = req.body;

  if (!authorization) {
    res.status(400).send({ "data": null, "message": "invalid access token" });
  } else {
    const token = authorization.split(' ')[1];
    const data: any = jwt.verify(token, process.env.ACCESS_SECRET);

    //이름수정
    if (username) {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ username: username })
        .where({ id: data.id })
        .execute();
      res.status(302).send({ "message": "update successfully" })
    }

    //비번수정
    if (password) {
      const createSalt: Function = () =>
        new Promise((resolve, reject) => {
          crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
          });
        })
      const createHashedPassword: Function = (plainpassword) =>
        new Promise(async (resolve, reject) => {
          const salt = await createSalt();
          crypto.pbkdf2(plainpassword, salt, 1000, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ hashPwd: key.toString('base64'), salt });
          });
        });
      const { hashPwd, salt } = await createHashedPassword(password);
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ password: hashPwd, salt: salt })
        .where({ id: data.id })
        .execute();
      res.status(302).send({ "message": "update successfully" })
    }

    //사이트 배경색상
    if (siteColor) {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ siteColor: siteColor })
        .where({ id: data.id })
        .execute();
      res.status(302).send({ "message": "update successfully" })
    }

    // if(red){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: red})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }
    // if(violet){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: violet})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }
    // if(blue){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: blue})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }
    // if(cyan){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: cyan})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }
    // if(teal){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: teal})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }
    // if(lime){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: lime})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }
    // if(yellow){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: yellow})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }
    // if(orange){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: orange})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }
    // if(random){
    //   await getConnection()
    //     .createQueryBuilder()
    //     .update(Usersiteoption)
    //     .set({ siteColor: random})
    //     .where({userId:data.id})
    //     .execute(); 
    //     res.status(302).send()
    // }

    //다크모드
    if (darkMode) {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ darkMode: darkMode })
        .where({ id: data.id })
        .execute();
      res.status(302).send({ "message": "update successfully" })
    }
  }
}

