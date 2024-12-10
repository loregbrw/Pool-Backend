import AppError from "../errors";
import Card from "../entities/Card.entity";
import AppDataSource from "../data-source";
import Section from "../entities/Section.entity";
import CardsColumn from "../entities/CardsColumn.entity";

import { TCardCreation, TCardMove, TCardUpdate } from "../schemas/CardSchemas";
import { io } from "../server";
import CardTag from "../entities/CardTag";
import { In } from "typeorm";
import Sprint from "../entities/Sprint.entity";

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

    public static update = async (id: string, payload: TCardUpdate) => {

        const cardRepo = AppDataSource.getRepository(Card);
        const tagRepo = AppDataSource.getRepository(CardTag);

        if (payload.columnId && payload.sectionId)
            throw new AppError("Invalid parameters sectionId AND columnId", 400);

        const card = await cardRepo.findOne({
            where: { id: id },
            relations: {
                tags: true
            }
        })

        let tags = card?.tags;

        if (payload.tagsId) {
            tags = await tagRepo.find({
                where: { id: In(payload.tagsId) }
            });
        }

        if (!card)
            throw new AppError("Card not found!", 404);

        const updatedCard = cardRepo.create({ ...card, ...payload, tags: tags });
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

    public static moveCard = async (id: string, payload: TCardMove) => {

        const columnRepo = AppDataSource.getRepository(CardsColumn);
        const cardRepo = AppDataSource.getRepository(Card);

        const card = await cardRepo.findOne({
            where: {
                id
            },
            relations: {
                column: {
                    sprint: true
                }
            },
            order: {
                column: {
                    cards: {
                        index: "ASC"
                    }
                }
            }
        });

        if (!card) throw new AppError("Card not found!", 404);

        const sourceColumn = card.column;
        if (!sourceColumn) throw new AppError("Source column not found!", 404);

        const destColumn = await columnRepo.findOne({
            where: {
                id: payload.destColumnId
            },
            relations: {
                cards: true
            },
            order: {
                cards: {
                    index: "ASC"
                }
            }
        });

        if (!destColumn) throw new AppError("Destination column not found!", 404);

        sourceColumn.cards = sourceColumn.cards || [];
        destColumn.cards = destColumn.cards || [];

        sourceColumn.cards = sourceColumn.cards.filter((c) => c.id !== id);

        sourceColumn.cards.forEach((c, index) => {
            c.index = index;
        });

        const newIndex = payload.newIndex ?? destColumn.cards.length;
        destColumn.cards.splice(newIndex, 0, card);

        destColumn.cards.forEach((c, index) => {
            c.index = index;
        });

        await columnRepo.save([sourceColumn, destColumn]);
        await cardRepo.save([...sourceColumn.cards, ...destColumn.cards]);
    }
}