import AppDataSource from "../data-source";
import Section from "../entities/Section.entity";
import AppError from "../errors";
import CardsColumn from "../entities/CardsColumn.entity";
import { TSectionCreation } from "../schemas/SectionSchema";

export default class SectionService {

    public static create = async (payload: TSectionCreation) => {

        const sectionRepo = AppDataSource.getRepository(Section);
        const columnRepo = AppDataSource.getRepository(CardsColumn);

        const column = await columnRepo.findOne({ where: { id: payload.columnId } });

        if (!column)
            throw new AppError("Column not found!", 404);

        const section = sectionRepo.create({ ...payload, column: column });
        const createdSection = await sectionRepo.save(section);

        return createdSection;
    }
}