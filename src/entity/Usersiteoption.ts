import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm";
import User from "./User";

@Entity()
export default class Usersiteoption extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  darkMode: boolean;

  @Column()
  siteColor: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

}
