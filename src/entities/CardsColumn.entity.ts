import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import Card from "./Card.entity";
import Sprint from "./Sprint.entity";
import Section from "./Section.entity";

@Entity("CardsColumn")
export default class CardsColumn extends BaseEntity {
    @Column()
    name?: string;

    @Column()
    index?: number;

    @ManyToOne(() => Sprint, { cascade: true })
    sprint?: Sprint;

    @OneToMany(() => Card, (c) => c.column)
    cards?: Card[];

    @OneToMany(() => Section, (s) => s.column)
    sections?: Section[];
}