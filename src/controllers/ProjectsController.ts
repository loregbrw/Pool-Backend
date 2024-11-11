import { Request, Response } from "express";
import AppError from "../errors";
import ProjectService from "../services/ProjectService";

export default class ProjectsController {

    public static create = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const project = await ProjectService.create(req.body, userSession.id);
        return res.status(201).json({ project });
    }

    public static get = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const search = typeof req.query.search === "string" ? req.query.search : "";
        const tagId = typeof req.query.tagId === "string" ? req.query.tagId : undefined;

        const projects = await ProjectService.getByUser(userSession.id, search, tagId);
        return res.status(200).json({ projects });
    }

    public static getById = async (req: Request, res: Response) => {
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const project = await ProjectService.getById(req.params.id, userSession.id);
        return res.status(200).json({ project });
    }
}