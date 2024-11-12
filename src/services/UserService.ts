import AppError from "../errors";
import User from "../entities/User.entity";
import AppDataSource from "../data-source";

import { Like } from "typeorm";
import { genSalt, hash } from "bcryptjs";
import { TUserCreation, TUserUpdate } from "../schemas/UserSchemas";

export default class UserService {
    public static create = async (payload: TUserCreation): Promise<User> => {

        const userRepo = AppDataSource.getRepository(User);

        const findEmail = await userRepo.findOne({
            where: [
                { email: payload.email },
                { username: payload.email }
            ]
        })

        if (findEmail)
            throw new AppError("Email already in use!", 400);

        const findUsername = await userRepo.findOne({
            where: [
                { username: payload.username },
                { username: payload.email }
            ]
        })

        if (findUsername)
            throw new AppError("Username already in use!");

        const image = payload.image || "/User.png";

        const salt = await genSalt(12);
        const hashedPassword = await hash(payload.password, salt);

        const user: User = userRepo.create({ ...payload, password: hashedPassword, image: image });
        const createdUser = await userRepo.save(user);

        return { ...createdUser, password: undefined };
    }

    public static exists = async (str: string): Promise<boolean> => {
        const userRepo = AppDataSource.getRepository(User);
    
        const find = await userRepo.findOneBy([
            { email: str },
            { username: str }
        ]);
    
        return find !== null;
    }
    

    public static update = async (id: string, payload: TUserUpdate): Promise<User> => {

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: id } });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        const updatedUser = userRepo.create({ ...user, ...payload });
        const savedUser = await userRepo.save(updatedUser);

        console.log(savedUser);

        return { ...savedUser, password: undefined };
    }

    public static delete = async (id: string): Promise<void> => {

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: id } });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        await userRepo.softDelete(id);
    }

    public static getPagination = async (page: number, size: number, search: string): Promise<Partial<User>[]> => {

        const userRepo = AppDataSource.getRepository(User);

        const users = await userRepo.find({
            where: [
                { name: Like(`%${search}%`) },
                { username: Like(`%${search}%`) },
                { email: Like(`%${search}%`) }
            ],
            withDeleted: false,
            take: size,
            skip: (page - 1) * size,
        });

        return users.map(user => {
            return { ...user, password: undefined };
        });
    }


    public static getById = async (id: string): Promise<Partial<User>> => {

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: id }, withDeleted: false });

        if (!user)
            throw new AppError("User not found!", 404);

        return { ...user, password: undefined };
    }
}
