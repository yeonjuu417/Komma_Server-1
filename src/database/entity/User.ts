import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import Playlist from "./Playlist";

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  siteColor: string;

  @Column()
  salt: string;

  @OneToMany(type => Playlist, playlist => playlist.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  playlists: Playlist[];

  static async insertInfo(data: object): Promise<User | undefined> {
    await this.createQueryBuilder()
      .insert()
      .into(User)
      .values(data)
      .execute();

    return;
  }

  static async changeInfo(id: number, data: object): Promise<User | undefined> {
    await this.createQueryBuilder()
      .update(User)
      .set(data)
      .where("id = :id", { id })
      .execute();

    return this.findOne({ id });
  }
}
