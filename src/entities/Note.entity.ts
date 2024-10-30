import { Column, Entity, ManyToOne, } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";

@Entity("Notes")
export default class Note extends BaseEntity {
    @Column({ length: 500 })
    body?: string;

    @Column()
    createdAt?: Date;

    @ManyToOne(() => User, { cascade: true })
    user?: User;
}