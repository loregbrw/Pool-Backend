import { Request, Response } from "express";
import AuthService from "../services/AuthService.service";
import UserService from "../services/UserService.service";
import AppError from "../errors";

export default class UsersController {

    public static login = async (req: Request, res: Response) => {

        const token = await AuthService.login(req.body);
        return res.status(200).json({ token });
    }

    public static create = async (req: Request, res: Response) => {

        const user = await UserService.create(req.body);
        return res.status(201).json({ user });
    }

    public static get = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const user = await UserService.getById(userSession.id);
        return res.status(200).json({ user });
    }

    public static update = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;
    
        console.log(userSession);
        if (!userSession)
            throw new AppError("Unathorized!", 401);

        const user = await UserService.update(userSession.id, req.body);
        return res.status(200).json({ user });
    }

    public static delete = async (req: Request, res: Response) => {

        const userSession = (req as any).userSession;

        if (!userSession)
            throw new AppError("Unathorized!", 401);

        await UserService.delete(userSession.id);
        return res.status(204).send();
    }

    public static getPagination = async (req: Request, res: Response) => {

        // require token to get users!

        const { page = 1, size = 10, search = "" } = req.query;

        const users = await UserService.getPagination(Number(page), Number(size), search as string);

        return res.json({ users });
    }
}