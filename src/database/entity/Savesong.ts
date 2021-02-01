import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import Playlist from "./Playlist";

@Entity()
export default class Savesong extends BaseEntity {

  @PrimaryGeneratedColumn()
  savesongId: number;

  @Column()
  id: number;
  
  @Column()
  iconImg: string;

  @Column()
  title: string;

  @Column()
  soundFile: string;

  @Column({ type: "float" })
  defaultVolume: number;

  @Column({ default: false })
  play: boolean;

  @ManyToOne(type => Playlist, playlist => playlist.savesongs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  playlist: Playlist;

  static async insertInfo(data: object): Promise<Savesong | undefined> {
    const result = await this.createQueryBuilder()
      .insert()
      .into(Savesong)
      .values(data)
      .execute()
      .then(data => {
        return data.identifiers[0].id;
      })
      return result;
  }
}
