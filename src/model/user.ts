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
      length: constant.threeChinese
    })
    pair: string;

    // Pair's character revealed
    @Column()
    character1Revealed: boolean;

    @Column()
    character2Revealed: boolean;

    @Column()
    character3Revealed: boolean;

    @Column({
      length: constant.threeChinese
    })
    answer1: string;

    @Column({
      length: constant.threeChinese
    })
    answer2: string;

    @Column()
    silverNum: number;

    @Column()
    silverTimestamp: number;

    @Column()
    goldenNum: number;

    @Column()
    goldenTimestamp: number;
}