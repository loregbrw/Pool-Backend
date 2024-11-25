import AppError from "../errors";
import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import Sprint from "../entities/Sprint.entity";
import Project from "../entities/Project.entity";

import { TSprintCreation, TSprintUpdate } from "../schemas/SprintSchemas";

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
            where: { id: id }
        });

        if (!sprint)
            throw new AppError("Sprint not found!", 404);

        const updatedSprint = sprintRepo.create({ ...sprint, ...payload });
        const savedSprint = await sprintRepo.save(updatedSprint);

        return savedSprint;
    }

    public static getById = async (id: string): Promise<Sprint> => {

        const sprintRepo = AppDataSource.getRepository(Sprint);

        const sprint = await sprintRepo.findOne({
            where: { id: id },
            relations: {
                columns: true
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
}