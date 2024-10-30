import { Request, Response } from "express";
import AppError from "../errors";
import CardService from "../services/CardService.service";

export default class CardsController {

    public static create = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        // verify if there is access

        const card = await CardService.create(req.body);
        return res.status(201).json({ card });
    };

    public static update = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        // verify if there is access

        const card = await CardService.update(req.params.id, req.body, userSession.id);
        return res.status(201).json({ card });
    }

    public static getById = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        // verify if there is access

        const card = await CardService.getById(req.params.id);
        return res.status(201).json({ card });
    }

    public static getBySprintId = async(req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        // verify if there is access

        const cards = await CardService.getBySprintId(req.params.sprintId);
        return res.status(201).json({ cards });
    }
}