import { Request, Response } from "express";
import AppError from "../errors";
import SprintService from "../services/SprintService";

export default class SprintsController {

    public static create = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const sprint = await SprintService.create(req.body, userSession.id);
        return res.status(201).json({ sprint });
    }

    public static update = async (req: Request, res: Response) => {
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const sprint = await SprintService.update(req.params.id, req.body, userSession.id);
        return res.status(201).json({ sprint });
    }

    public static getById = async (req: Request, res: Response) => {
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const sprint = await SprintService.getById(req.params.id);
        return res.status(200).json({ sprint });
    }

    public static getByProjectId = async (req: Request, res: Response) => {
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const sprint = await SprintService.getByProject(req.params.projectId);
        return res.status(200).json({ sprint });
    }

    public static moveColumn = async (req: Request, res: Response) => {
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const sprint = await SprintService.moveColumn(req.params.id, req.body);
        return res.status(200).json({ sprint });
    }

    public static reorderColumns = async (req: Request, res: Response) => {
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const sprint = await SprintService.reorderColumn(req.params.id, req.body);
        return res.status(200).json({ sprint });
    }
} 