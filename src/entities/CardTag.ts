import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import Card from "./Card.entity";
import Project from "./Project.entity";

@Entity("CardTags")
export default class CardTag extends BaseEntity {
    @Column()
    name?: string;

    @Column()
    color?: string;

    @ManyToMany(() => Card)
    @JoinTable()
    cards?: Card[];

    @ManyToOne(() => Project, { cascade: true })
    project?: Project;
}