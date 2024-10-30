import AppDataSource from "../data-source";
import Tag from "../entities/Tag.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import { TTagCreation, TTagUpdate } from "../schemas/TagSchemas.schemas";

export default class TagService {
    public static create = async (payload: TTagCreation, userId: string): Promise<Tag> => {
        
        const tagRepo = AppDataSource.getRepository(Tag);
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { id: userId } });
        
        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        const tag = tagRepo.create({ ...payload, user: user });
        const createdTag = await tagRepo.save(tag);

        return { ...createdTag, user: undefined };
    }

    public static update = async (id: string, payload: TTagUpdate, userId: string): Promise<Tag> => {
        
        const tagRepo = AppDataSource.getRepository(Tag);

        const tag = await tagRepo.findOne({
            where: { id: id },
            relations: {
                user: true
            }
        });

        if (!tag)
            throw new AppError("Tag not found!", 400);

        if (tag.user?.id !== userId)
            throw new AppError("Unathorized!", 401);

        const updatedTag = tagRepo.create({ ...tag, ...payload });
        const savedTag = await tagRepo.save(updatedTag);

        return { ...savedTag, user: undefined };
    }

    public static delete = async (id: string, userId: string): Promise<void> => {

        const tagRepo = AppDataSource.getRepository(Tag);

        const tag = await tagRepo.findOne({
            where: { id: id },
            relations: {
                user: true
            }
        });

        if (!tag)
            throw new AppError("Tag not found!", 400);

        if (tag.user?.id !== userId)
            throw new AppError("Unathorized!", 401);

        await tagRepo.softDelete(id);
    }

    public static getByUser = async (userId: string): Promise<Tag[]> => {

        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { id: userId }, relations: { tags: true } });

        if (!user)
            throw new AppError("User not found!", 404);

        return user.tags || [];
    }
}