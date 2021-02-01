import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import User from "./User";
import Savesong from "./Savesong";

@Entity()
export default class Playlist extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  icon: string;

  @Column({ default: false })
  play: boolean;

  @ManyToOne(type => User, user => user.playlists, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  user: User;

  @OneToMany(type => Savesong, savesong => savesong.playlist, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  savesongs: Savesong[];

  static async insertInfo(data: object): Promise<Playlist | undefined> {
    const result = await this.createQueryBuilder()
      .insert()
      .into(Playlist)
      .values(data)
      .execute()
      .then(data => {
        return data.identifiers[0].id;
      })
    return result;
  }

  static async changeTitle(id: number, userId: number, data: object): Promise<Playlist | undefined> {
    await this.createQueryBuilder()
      .update(Playlist)
      .set(data)
      .where("id = :id", { id: id })
      .andWhere("user = :user", { user: userId })
      .execute();

    return this.findOne({ id });
  }

  static async deletePlayList(id: number, userId: number): Promise<Playlist | undefined> {
    await this.createQueryBuilder()
      .delete()
      .from(Playlist)
      .where("id = :id", { id: id })
      .andWhere("user = :user", { user: userId })
      .execute();

    return this.findOne({ id });
  }
}
