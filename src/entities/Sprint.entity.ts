import { Column, Entity, ManyToOne, NumericType, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import Project from "./Project.entity";
import CardsColumn from "./CardsColumn.entity";

@Entity("Sprints")
export default class Sprint extends BaseEntity {
    @Column()
    name?: string;

    @Column()
    initialDate?: Date;

    @Column()
    duration?: number;

    @Column()
    status?: boolean;

    @ManyToOne(() => Project, { cascade: true })
    project?: Project;

    @OneToMany(() => CardsColumn, (c) => c.sprint)
    columns?: CardsColumn[];
}