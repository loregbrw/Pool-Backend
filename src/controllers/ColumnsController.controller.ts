import { Request, Response } from "express";
import AppError from "../errors";
import ColumnService from "../services/ColumnService.service";

export default class ColumnsController {

    public static create = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const column = await ColumnService.create(req.body, userSession.id);
        return res.status(201).json({ column });
    }

    public static update = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const column = await ColumnService.update(req.params.id, req.body, userSession.id);
        return res.status(201).json({ column });
    }
}