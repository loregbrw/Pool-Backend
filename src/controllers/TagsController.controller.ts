import { Request, Response } from "express";
import AppError from "../errors";
import TagService from "../services/TagService.service";

export default class TagsController {
    
    public static create = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const tag = await TagService.create(req.body, userSession.id);
        return res.status(201).json({ tag });
    }

    public static update = async (req: Request, res: Response) => {
        
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const tag = await TagService.update(req.params.id, req.body, userSession.id);
        return res.status(200).json({ tag });
    }

    public static delete = async (req: Request, res: Response) => {
        
        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        await TagService.delete(req.params.id, userSession.id);
        return res.status(204).send();
    }

    public static getByUser = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const tags = await TagService.getByUser(userSession.id);

        return res.status(200).json({ tags });
    }
}