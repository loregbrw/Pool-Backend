import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import AppError from "../errors";
import UserSession from "../sessions/UserSession";
import AuthService from "../services/AuthService.service";

export default class ValidateMiddleware {
    
    public static validadeBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {

        const validated = schema.parse(req.body);

        req.body = validated;

        return next();
    }

    public static validadeToken = async (req: Request, res: Response, next: NextFunction) => {

        const auth = req.headers.authorization;

        if (!auth)
            throw new AppError("Missing baerer token!", 401);

        const [_baerer, token] = auth.split(" ");

        const userId = await AuthService.verifyToken(token);

        if (!userId)
            throw new AppError("Invalid token!", 401);

        const userSession = new UserSession(userId);
        (req as any).userSession = userSession;

        next();
    }
}