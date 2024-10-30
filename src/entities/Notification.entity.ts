import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";

const contentColumnType = process.env.DB_TYPE === "postgres" ? "json" : "nvarchar";
const contentColumnLength = process.env.DB_TYPE === "mssql" ? "MAX" : undefined;

@Entity("Notifications")
export default class Notification extends BaseEntity {
    @ManyToOne(() => User, { cascade: true })
    user?: User;

    @Column()
    status?: boolean;

    @Column()
    date?: Date;

    @Column({ type: contentColumnType, length: contentColumnLength })
    content?: string;
}
