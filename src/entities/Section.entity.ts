import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import CardsColumn from "./CardsColumn.entity";
import Card from "./Card.entity";

@Entity("Sections")
export default class Section extends BaseEntity {
    @Column()
    name?: string;

    @Column()
    color?: string;

    @Column()
    index?: number;

    @ManyToOne(() => CardsColumn, { cascade: true })
    column?: CardsColumn;

    @OneToMany(() => Card, (c) => c.section)
    cards?: Card[];
}