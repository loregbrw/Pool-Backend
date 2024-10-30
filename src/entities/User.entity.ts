import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import Project from "./Project.entity";
import Permission from "./Permission.entity";
import Note from "./Note.entity";
import Tag from "./Tag.entity";
import Card from "./Card.entity";
import Notification from "./Notification.entity";

@Entity("Users")
export default class User extends BaseEntity {
    @Column()
    name?: string;
    
    @Column()
    username?: string;
    
    @Column()
    email?: string;

    @Column()
    birthdate?: Date;

    @Column()
    password?: string;

    @Column()
    image?: string;

    @OneToMany(() => Project, (p) => p.user)
    projects?: Project[];

    @OneToMany(() => Permission, (p) => p.user)
    permissions?: Permission[];

    @OneToMany(() => Note, (n) => n.user)
    notes?: Note[];

    @OneToMany(() => Tag, (t) => t.user)
    tags?: Tag[];

    @ManyToMany(() => Card)
    @JoinTable()
    cards?: Card[];

    @OneToMany(() => Notification, (n) => n.user)
    notifications?: Notification[];

}
