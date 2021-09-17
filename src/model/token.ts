import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import * as constant from '../constant';

@Entity()
export default class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      length: constant.shortText
    })
    token: string;

    @Column()
    forCharacter: number;

    @Column({
      length: constant.threeChinese,
      default: ''
    })
    usedBy: string;

    @Column({ default: 0, type: 'bigint' })
    usedTimestamp: number;
}