import AppDataSource from "../data-source";
import Card from "../entities/Card.entity";
import AppError from "../errors";
import Section from "../entities/Section.entity";
import CardsColumn from "../entities/CardsColumn.entity";
import User from "../entities/User.entity";
import { TCardCreation, TCardUpdate } from "../schemas/CardSchema.schemas";

export default class CardService {

    public static create = async (payload: TCardCreation) => {

        const cardRepo = AppDataSource.getRepository(Card);
        const columnRepo = AppDataSource.getRepository(CardsColumn);
        const sectionRepo = AppDataSource.getRepository(Section);

        if (payload.columnId && payload.sectionId)
            throw new AppError("Invalid parameters sectionId AND columnId", 400);

        if (!payload.columnId && !payload.sectionId)
            throw new AppError("Card must have a secion or a column!", 400);

        if (payload.columnId) {

            const column = await columnRepo.findOne({ where: { id: payload.columnId } });

            if (!column)
                throw new AppError("Column not found!", 404);

            const card = cardRepo.create({ ...payload, column: column })
            const createdCard = await cardRepo.save(card);

            return createdCard;
        }

        if (payload.sectionId) {

            const section = await sectionRepo.findOne({ where: { id: payload.sectionId } });

            if (!section)

                throw new AppError("Section not found!", 404);

            const card = cardRepo.create({ ...payload, section: section })
            const createdCard = await cardRepo.save(card);

            return createdCard;
        }
    }

    public static update = async (id: string, payload: TCardUpdate, userId: string) => {

        const cardRepo = AppDataSource.getRepository(Card);
        const userRepo = AppDataSource.getRepository(User);

        if (payload.columnId && payload.sectionId)
            throw new AppError("Invalid parameters sectionId AND columnId", 400);

        const user = await userRepo.findOne({ where: { id: userId } });

        if (!user)
            throw new AppError("Problem authenticating user!", 401);

        const card = await cardRepo.findOne({
            where: { id: id }
        })

        if (!card)
            throw new AppError("Card not found!", 404);

        const updatedCard = cardRepo.create({ ...card, ...payload });
        const savedCard = await cardRepo.save(updatedCard);

        return savedCard;

    }

    public static getById = async (id: string) => {

        const cardRepo = AppDataSource.getRepository(Card);

        const card = await cardRepo.findOne({
            where: { id: id },
            relations: {
                tags: true,
                users: true
            }
        });

        if (!card)
            throw new AppError("Card not found!", 404);

        return card;
    }

    public static getBySprintId = async (sprintId: string) => {
        
        const cardRepo = AppDataSource.getRepository(Card);

        const cards = await cardRepo.find({
            where: {
                column: {
                    sprint: {
                        id: sprintId
                    }
                }
            }
        });

        return cards;
    }
}