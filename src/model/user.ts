import { Entity, Column, PrimaryColumn } from 'typeorm';
import * as constant from '../constant';

@Entity()
export default class User {
    @PrimaryColumn({
      length: constant.threeChinese
    })
    name: string;

    @Column({
      length: constant.threeChinese
    })
    constellation: string;

    // User own characters
    @Column({
      length: constant.shortText
    })
    character1: string;

    @Column({
      length: constant.shortText
    })
    character2: string;

    @Column({
      length: constant.shortText
    })
    character3: string;

    @Column({
      length: constant.threeChinese,
      default: ''
    })
    pair: string;

    // Pair's character revealed
    @Column({ default: false })
    character1Revealed: boolean;

    @Column({ default: false })
    character2Revealed: boolean;

    @Column({ default: false })
    character3Revealed: boolean;

    @Column({
      length: constant.threeChinese,
      default: ''
    })
    answer1: string;

    @Column({
      length: constant.threeChinese,
      default: ''
    })
    answer2: string;

    @Column({ default: 0 })
    silverNum: number;

    @Column({ default: 0 })
    silverTimestamp: number;

    @Column({ default: 0})
    goldenNum: number;

    @Column({ default: 0 })
    goldenTimestamp: number;
}