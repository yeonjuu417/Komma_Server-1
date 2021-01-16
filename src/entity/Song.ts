import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class Songlist extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  iconImg: string;

  @Column()
  soundFile: string;

  @Column({ default: 50 })
  defaltVoulume: number;

}
