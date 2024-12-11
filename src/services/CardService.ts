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

    private static updateIndex = (cards: Card[]) => {
        cards.forEach((card, index) => {
            card.index = index;
        });
    }

    public static moveCard = async (id: string, payload: TCardMove) => {
        
        const columnRepo = AppDataSource.getRepository(CardsColumn);
        const cardRepo = AppDataSource.getRepository(Card);

        const card = await cardRepo.findOne({
            where: {
                id: id
            },
            relations: {
                column: true
            }
        });

        if (!card) throw new AppError("Card not found!", 404);
        if (!card.column) throw new AppError("Card column is undefined!", 500);

        const sourceColumn = await columnRepo.findOne({
            where: {
                id: card.column.id
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

        if (!sourceColumn) throw new AppError("Internal server error!", 500);

        if (payload.destColumnId == sourceColumn.id) {

            const newCards = sourceColumn.cards || [];

            newCards.splice(card.index!, 1);
            newCards.splice(payload.newIndex, 0, card);
            newCards.forEach((card, index) => (card.index = index));

            sourceColumn.cards = newCards;

            await columnRepo.save(sourceColumn);
            return;
        }

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
        this.updateIndex(sourceColumn.cards);

        const newIndex = payload.newIndex > destColumn.cards.length ? destColumn.cards.length : payload.newIndex;

        destColumn.cards.splice(newIndex, 0, card);
        this.updateIndex(destColumn.cards);

        await columnRepo.save(sourceColumn);
        await columnRepo.save(destColumn);
    }
}