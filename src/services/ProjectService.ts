import AppDataSource from "../data-source";
import Permission from "../entities/Permission.entity";
import Project from "../entities/Project.entity";
import Sprint from "../entities/Sprint.entity";
import Tag from "../entities/Tag.entity";
import User from "../entities/User.entity";
import { EPermission } from "../enums/EPermission.enum";
import AppError from "../errors";
import { TProjectCreation, TProjectUpdate } from "../schemas/ProjectSchemas";
import { TSprintCreation } from "../schemas/SprintSchemas";
import SprintService from "./SprintService";

export default class ProjectService {

    public static create = async (payload: TProjectCreation, userId: string): Promise<Project> => {

        const userRepo = AppDataSource.getRepository(User);
        const tagRepo = AppDataSource.getRepository(Tag);
        const projectRepo = AppDataSource.getRepository(Project);
        const permissionRepo = AppDataSource.getRepository(Permission);

        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        const tag = await tagRepo.findOne({ where: { id: payload.tagId } });

        if (!tag)
            throw new AppError("Invalid Tag!", 400);

        const project = projectRepo.create({ name: payload.name, description: payload.description, status: false, tag: tag, user: user });
        const createdProject = await projectRepo.save(project);

        const sprintData: TSprintCreation = {
            name: "Sprint 1",
            initialDate: payload.sprintInitialDate,
            duration: payload.sprintDuration,
            projectId: createdProject.id!
        };

        const sprint = await SprintService.create(sprintData, userId);

        for (const id of payload.users) {

            const foundUser = await userRepo.findOne({ where: { id: id } });

            if (!foundUser) {
                throw new AppError(`Invalid userId! [${id}]`, 400);
            } else {
                const permission = permissionRepo.create({
                    user: foundUser,
                    project: createdProject,
                    permission: EPermission.EDITOR
                });

                await permissionRepo.save(permission);
            }
        }

        return { ...createdProject, user: undefined };
    }

    public static update = async (id: string, payload: TProjectUpdate, userId: string): Promise<Project> => {

        const projectRepo = AppDataSource.getRepository(Project);

        const project = await projectRepo.findOne({
            where: { id: id },
            relations: {
                user: true
            }
        });

        if (!project)
            throw new AppError("Project not found!", 400);

        if (project.user?.id !== userId)
            throw new AppError("Unathorized!", 401);

        const updatedProject = projectRepo.create({ ...project, ...payload });
        const savedProject = await projectRepo.save(updatedProject);

        return { ...savedProject, user: undefined };
    }

    public static delete = async (id: string, userId: string): Promise<void> => {

        const projectRepo = AppDataSource.getRepository(Project);

        const project = await projectRepo.findOne({
            where: { id: id },
            relations: {
                user: true
            }
        });

        if (!project)
            throw new AppError("Project not found!", 400);

        if (project.user?.id !== userId)
            throw new AppError("Unathorized!", 401);

        await projectRepo.softDelete(id);
    }

    public static getById = async (id: string, userId: string): Promise<{ project: Project, permission: string }> => {

        const userRepo = AppDataSource.getRepository(User);
        const projectRepo = AppDataSource.getRepository(Project);
        const permissionRepo = AppDataSource.getRepository(Permission);

        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user)
            throw new AppError("User authentication failed!", 401);

        const project = await projectRepo.findOne({
            where: { id: id },
            relations: {
                user: true,
                sprints: true,
                permissions: true
            }
        });

        if (!project)
            throw new AppError("Project not found!", 404);

        if (project.user?.id !== user.id) {
            const permission = await permissionRepo.findOne({
                where: {
                    project,
                    user
                }
            });

            if (!permission)
                throw new AppError("Forbidden access!", 403);

            return { project: { ...project, user: undefined, permissions: undefined }, permission: permission.permission?.toString()! };
        }

        return { project: { ...project, user: undefined, permissions: undefined }, permission: "Own" };
    };


    public static getByUser = async (userId: string, search: string): Promise<{ project?: Project, status?: string }[]> => {

        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({
            where: { id: userId },
            relations: {
                projects: {
                    tag: true,
                    permissions: true,
                },
                permissions: {
                    project: {
                        tag: true,
                        permissions: true,
                    }
                }
            }
        });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        const ownProjects = (user.projects || []).filter(project =>
            project.name?.toLowerCase().includes(search!.toLowerCase())
        );

        const ownProjectsWithStatus = ownProjects.map(project => ({
            project,
            status: "Owner",
        }));

        const permissions = user.permissions || [];

        const permissionProjects = permissions
            .filter(permission =>
                permission.project?.name?.toLowerCase().includes(search!.toLowerCase())
            )
            .map(permission => ({
                project: permission.project,
                status: permission.permission?.toString(),
            }));

        const allProjects = [...ownProjectsWithStatus, ...permissionProjects];
        
        return allProjects;
    }
}