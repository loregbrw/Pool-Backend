import AppError from "../errors";
import User from "../entities/User.entity";
import AppDataSource from "../data-source";
import Sprint from "../entities/Sprint.entity";
import CardsColumn from "../entities/CardsColumn.entity";

import { TColumnCreation, TColumnUpdate } from "../schemas/ColumnSchemas";

export default class ColumnService {

    public static create = async (payload: TColumnCreation, userId: string) => {

        // adicionar verificação de editor e owner

        const columnRepo = AppDataSource.getRepository(CardsColumn);
        const sprintRepo = AppDataSource.getRepository(Sprint);
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        const sprint = await sprintRepo.findOne({ where: { id: payload.sprintId } });

        if (!sprint)
            throw new AppError("Sprint not found!", 404);

        const column = columnRepo.create({ name: payload.name, index: payload.index, sprint: sprint });
        const createdColumn = await columnRepo.save(column);

        return createdColumn;
    }

    public static update = async (id: string, payload: TColumnUpdate, userId: string) => {

        const columnRepo = AppDataSource.getRepository(CardsColumn);
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        const column = await columnRepo.findOne({
            where: { id: id }
        })

        if (!column)
            throw new AppError("Column not found!", 404);

        const updatedColumn = columnRepo.create({ ...column, ...payload });
        const savedColumn = await columnRepo.save(updatedColumn);

        return savedColumn;
    }

    public static getBySprint = async (sprintId: string): Promise<CardsColumn[]> => {

        const columnRepo = AppDataSource.getRepository(CardsColumn);

        const columns = await columnRepo.find({
            where: {
                sprint: {
                    id: sprintId
                }
            },
            relations: {
                cards: true
            }
        });

        return columns;
    }
}