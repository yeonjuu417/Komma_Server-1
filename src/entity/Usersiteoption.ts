import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export default class Usersiteoption extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    darkMode: boolean;

    @Column()
    siteColor: string;

    @Column({default : "00:25:00"})
    timer: string;
}
