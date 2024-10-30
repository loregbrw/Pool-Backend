import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../errors";

const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    if (err instanceof AppError) {
        return res.status(err.status).json({ message: err.message });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({ message: err.flatten().fieldErrors });
    }

    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
}

export default handleError;
