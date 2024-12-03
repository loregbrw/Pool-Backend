import AppError from "../errors";
import User from "../entities/User.entity";
import Card from "../entities/Card.entity";
import AppDataSource from "../data-source";
import Section from "../entities/Section.entity";
import CardsColumn from "../entities/CardsColumn.entity";

import { TCardCreation, TCardUpdate } from "../schemas/CardSchemas";
import { io } from "../server";

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

            const column = await columnRepo.findOne({ 
                where: { id: payload.columnId },
                relations: {
                    sprint: {
                        project: true
                    }
                }
            });

            if (!column)
                throw new AppError("Column not found!", 404);

            const card = cardRepo.create({ ...payload, column: column })
            const createdCard = await cardRepo.save(card);

            io.emit(`project_updated_${column.sprint?.project?.id}`, { card: createdCard });

            return createdCard;
        }

        if (payload.sectionId) {

            const section = await sectionRepo.findOne({
                where: { id: payload.sectionId },
                relations: {
                    column: {
                        sprint: {
                            project: true
                        }
                    }
                }
            });

            if (!section)

                throw new AppError("Section not found!", 404);

            const card = cardRepo.create({ ...payload, section: section })
            const createdCard = await cardRepo.save(card);

            io.emit(`project_updated_${section.column?.sprint?.project?.id}`, { card: createdCard });

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
            where: { id: id },
        })

        if (!card)
            throw new AppError("Card not found!", 404);

        const updatedCard = cardRepo.create({ ...card, ...payload });
        const savedCard = await cardRepo.save(updatedCard);

        io.emit(`project_updated_${card.column?.sprint?.project?.id || card.section?.column?.sprint?.project}`, { card: savedCard });

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

    public static getByColumnId = async (columnId: string) => {
        
        const cardRepo = AppDataSource.getRepository(Card);

        const cards = await cardRepo.find({
            where: {
                column: {
                    id: columnId
                }
            },
            order: {
                index: 'ASC'
            },
            relations: {
                section: true,
                tags: true,
                users: true
            }
        });

        return cards;
    }
}