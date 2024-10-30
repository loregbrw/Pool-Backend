import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EPermission, permissionToString, stringToPermission } from "../enums/EPermission.enum";
import BaseEntity from "./BaseEntity.entity";
import User from "./User.entity";
import Project from "./Project.entity";

@Entity("Permissions")
export default class Permission extends BaseEntity {
    @ManyToOne(() => User, { cascade: true })
    user?: User;

    @ManyToOne(() => Project, { cascade: true })
    project?: Project;

    @Column({
        type: "varchar",
        length: 20,
        transformer: {
            to: permissionToString,
            from: stringToPermission
        }
    })
    permission?: EPermission;
}