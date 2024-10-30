import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";
import Project from "./Project.entity";

@Entity("Tags")
export default class Tag extends BaseEntity {
    @Column()
    name?: string;

    @Column()
    color?: string;

    @ManyToOne(() => User, { cascade: true })
    user?: User;

    @OneToMany(() => Project, (p) => p.tag)
    projects?: Project[];
}
