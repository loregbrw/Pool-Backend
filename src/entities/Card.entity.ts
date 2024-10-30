import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import CardsColumn from "./CardsColumn.entity";
import Section from "./Section.entity";
import CardTag from "./CardTag";
import User from "./User.entity";

@Entity("Cards")
export default class Card extends BaseEntity {
    @Column()
    name?: string;

    @Column({ length: 5000, nullable: true })
    description?: string;

    @Column({ nullable: true})
    dueDate?: Date;

    @Column()
    status?: boolean;

    @ManyToOne(() => CardsColumn, { cascade: true, nullable: true })
    column?: CardsColumn;

    @Column()
    index?: number;

    @ManyToOne(() => Section, { cascade: true, nullable: true })
    section?: Section;

    @ManyToMany(() => CardTag)
    @JoinTable()
    tags?: CardTag[];

    @ManyToMany(() => User)
    @JoinTable()
    users?: User[];
}
