import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";
import Tag from "./Tag.entity";
import Permission from "./Permission.entity";
import Sprint from "./Sprint.entity";

@Entity("Projects")
export default class Project extends BaseEntity {
    @Column()
    name?: string;

    @Column({ length: 500 })
    description?: string;

    @Column()
    status?: boolean;

    @ManyToOne(() => User, { cascade: true })
    user?: User;

    @ManyToOne(() => Tag, { cascade: false })
    tag?: Tag;

    @OneToMany(() => Permission, (p) => p.project)
    permissions?: Permission[];

    @OneToMany(() => Sprint, (s) => s.project)
    sprints?: Sprint[];
}