import { Request, Response } from "express";
import AppError from "../errors";
import SectionService from "../services/SectionService.service";

export default class SectionsController {

    public static create = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        // verify if there is access

        const section = await SectionService.create(req.body);
        return res.status(201).json({ card: section });
    }
}