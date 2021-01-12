import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Savesong extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playList: number;

    @Column()
    title: string;

    @Column()
    soundFile: string;

    @Column()
    customVoulume: number;
}
