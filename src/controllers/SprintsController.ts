import { Request, Response } from "express";
import AppError from "../errors";
import SprintService from "../services/SprintService.service";

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

    // public static get = async (req: Request, res: Response) => {

    //     const userSession = (req as any).userSession;

    //     if (!userSession)
    //         throw new AppError("Unathorized!", 401);

    //     const projects = await ProjectService.getByUser(userSession.id);
    //     return res.status(200).json({ projects });
    // }

    public static getById = async (req: Request, res: Response) => {
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const sprint = await SprintService.getById(req.params.id);
        return res.status(200).json({ sprint });
    }
} 