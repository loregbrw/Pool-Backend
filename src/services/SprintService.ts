import AppError from "../errors";
import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import Sprint from "../entities/Sprint.entity";
import Project from "../entities/Project.entity";

import { io } from "../server";
import CardsColumn from "../entities/CardsColumn.entity";
import { TSprintReorderColumns, TSprintCreation, TSprintMoveColumn, TSprintUpdate } from "../schemas/SprintSchemas";

export default class SprintService {

    public static create = async (payload: TSprintCreation, userId: string): Promise<Sprint> => {

        const sprintRepo = AppDataSource.getRepository(Sprint);
        const projectRepo = AppDataSource.getRepository(Project);
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        // verificar se o usuario tem permição ou se é viewer

        const project = await projectRepo.findOne({ where: { id: payload.projectId } });

        if (!project)
            throw new AppError("Project not found", 404);

        const sprint = sprintRepo.create({ ...payload, project: project, status: false });
        const createdSprint = await sprintRepo.save(sprint);

        io.emit(`project_updated_${payload.projectId}`, { sprint: createdSprint });

        return createdSprint;
    }

    public static update = async (id: string, payload: TSprintUpdate, userId: string): Promise<Sprint> => {

        const sprintRepo = AppDataSource.getRepository(Sprint);
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        // verificar se o usuario tem permição ou se é viewer

        const sprint = await sprintRepo.findOne({
            where: { id: id },
            relations: {
                project: true
            }
        });

        if (!sprint)
            throw new AppError("Sprint not found!", 404);

        const updatedSprint = sprintRepo.create({ ...sprint, ...payload });
        const savedSprint = await sprintRepo.save(updatedSprint);

        io.emit(`project_updated_${savedSprint.project?.id}`, { sprint: savedSprint });

        return savedSprint;
    }

    public static getById = async (id: string): Promise<Sprint> => {

        const sprintRepo = AppDataSource.getRepository(Sprint);

        const sprint = await sprintRepo.findOne({
            where: { id: id },
            relations: {
                columns: {
                    cards: {
                        tags: true,
                        users: true,
                        section: true
                    }
                }
            },
            order: {
                columns: {
                    index: "ASC",
                    cards: {
                        index: "ASC"
                    }
                }
            }
        })

        if (!sprint)
            throw new AppError("Sprint not found!", 404);

        return sprint;
    }

    public static getByProject = async (projectId: string): Promise<Sprint[]> => {

        const sprintRepo = AppDataSource.getRepository(Sprint);

        const sprints = await sprintRepo.find({
            where: {
                project: {
                    id: projectId
                }
            },
            order: {
                initialDate: 'ASC'
            }
        });

        return sprints;
    }

    public static moveColumn = async (id: string, payload: TSprintMoveColumn) => {

        const sprintRepo = AppDataSource.getRepository(Sprint);
        const columnRepo = AppDataSource.getRepository(CardsColumn);

        const sprint = await sprintRepo.findOne({
            where: { id: id },
            relations: {
                columns: {
                    cards: true
                }
            },
            order: {
                columns: {
                    index: "ASC",
                    cards: {
                        index: "ASC"
                    }
                }
            },
        });

        const columns = sprint?.columns || [];
        const movedColumn = columns.find((col) => col.id === payload.columnId);

        if (!movedColumn)
            throw new AppError("Column not found!", 404);

        columns.splice(columns.indexOf(movedColumn), 1);
        columns.splice(payload.newIndex, 0, movedColumn);

        for (let i = 0; i < columns.length; i++) {
            columns[i].index = i;
            await columnRepo.save(columns[i]);
        }

        return sprint;
    };

    public static reorderColumn = async (id: string, payload: TSprintReorderColumns) => {

        const sprintRepo = AppDataSource.getRepository(Sprint);
        const columnRepo = AppDataSource.getRepository(CardsColumn);
    
        const sprint = await sprintRepo.findOne({
            where: { id },
            relations: {
                columns: {
                    cards: true,
                },
            },
            order: {
                columns: {
                    index: "ASC",
                    cards: {
                        index: "ASC",
                    },
                },
            },
        });
    
        if (!sprint) throw new AppError("Sprint not found!");
    
        const updatedColumns: CardsColumn[] = [];
    
        for (const [index, colId] of payload.columns.entries()) {
            const column = await columnRepo.findOne({
                where: { id: colId },
                relations: {
                    cards: true,
                },
            });
    
            if (!column) throw new AppError("Column not found!", 404);
    
            column.index = index;
            updatedColumns.push(column);
        }
    
        await columnRepo.save(updatedColumns);
    
        sprint.columns = updatedColumns;
        await sprintRepo.save(sprint);
    
        return sprint;
    };
    
}