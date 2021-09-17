import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gameOn: boolean;
}