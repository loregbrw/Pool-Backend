import "dotenv/config";
import User from "../entities/User.entity";
import AppDataSource from "../data-source";
import AppError from "../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AES, enc } from "crypto-ts";
import { TUserLogin } from "../schemas/UserSchemas.schemas";

export default class AuthService {
    public static login = async (payload: TUserLogin): Promise<string> => {

        const userRepo = AppDataSource.getRepository(User);

        let user: User | null = await userRepo.findOne({
            where: [
                { email: payload.login },
                { username: payload.login }
            ]
        });

        if (!user || user.deletedAt) {
            throw new AppError("Invalid login!", 401);
        }

        if (!await compare(payload.password, user.password!)) {
            throw new AppError("Invalid password!", 401);
        }

        const secret = process.env.SECRET_KEY;
        if (!secret)
            throw new AppError("SECRET_KEY is not defined in environment variables!", 500);

        const token = jwt.sign(
            { id: user.id },
            secret!,
            { expiresIn: "60d" }
        );

        return token;
    }

    public static async verifyToken(token: string): Promise<string | null> {
        const secret = process.env.SECRET_KEY;
        if (!secret)
            throw new AppError("SECRET_KEY is not defined in environment variables!", 500);
    
        try {
            const decoded = jwt.verify(token, secret) as { id: string };
            return decoded.id || null;
        } catch (error) {
            return null;
        }
    }

    public static encryptData = (data: any) => {
        const secret = process.env.SECRET_KEY;
        if (!secret)
            throw new AppError("SECRET_KEY is not defined in environment variables!", 500);

        return AES.encrypt(data, secret!).toString();
    }

    public static decryptData = (encryptedData: any) => {
        const secret = process.env.SECRET_KEY;
        if (!secret)
            throw new AppError("SECRET_KEY is not defined in environment variables!", 500);

        const bytes = AES.decrypt(encryptedData, secret);
        const decryptedData = bytes.toString(enc.Utf8);
        if (!decryptedData)
            throw new AppError("Failed to decrypt data!", 500);

        return decryptedData;
    }
}
