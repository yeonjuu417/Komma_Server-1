import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import User from "./User";
import Savesong from "./Savesong";

@Entity()
export default class Playlist extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => User, user => user.playlists)
  user?: User;

  @OneToMany(type => Savesong, savesong => savesong.playlists)
  savesongs?: Savesong[];

}
