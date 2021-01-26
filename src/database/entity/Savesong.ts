import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import Playlist from "./Playlist";

@Entity()
export default class Savesong extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column()
  title: string;

  @Column()
  soundFile: string;

  @Column()
  customVolume: string;

  @ManyToOne(type => Playlist, playlist => playlist.savesongs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  playlist: Playlist;

}
