"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../data-source"));
const Card_entity_1 = __importDefault(require("../entities/Card.entity"));
const errors_1 = __importDefault(require("../errors"));
const Section_entity_1 = __importDefault(require("../entities/Section.entity"));
const CardsColumn_entity_1 = __importDefault(require("../entities/CardsColumn.entity"));
const User_entity_1 = __importDefault(require("../entities/User.entity"));
class CardService {
}
_a = CardService;
CardService.create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cardRepo = data_source_1.default.getRepository(Card_entity_1.default);
    const columnRepo = data_source_1.default.getRepository(CardsColumn_entity_1.default);
    const sectionRepo = data_source_1.default.getRepository(Section_entity_1.default);
    if (payload.columnId && payload.sectionId)
        throw new errors_1.default("Invalid parameters sectionId AND columnId", 400);
    if (!payload.columnId && !payload.sectionId)
        throw new errors_1.default("Card must have a secion or a column!", 400);
    if (payload.columnId) {
        const column = yield columnRepo.findOne({ where: { id: payload.columnId } });
        if (!column)
            throw new errors_1.default("Column not found!", 404);
        const card = cardRepo.create(Object.assign(Object.assign({}, payload), { column: column }));
        const createdCard = yield cardRepo.save(card);
        return createdCard;
    }
    if (payload.sectionId) {
        const section = yield sectionRepo.findOne({ where: { id: payload.sectionId } });
        if (!section)
            throw new errors_1.default("Section not found!", 404);
        const card = cardRepo.create(Object.assign(Object.assign({}, payload), { section: section }));
        const createdCard = yield cardRepo.save(card);
        return createdCard;
    }
});
CardService.update = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cardRepo = data_source_1.default.getRepository(Card_entity_1.default);
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    if (payload.columnId && payload.sectionId)
        throw new errors_1.default("Invalid parameters sectionId AND columnId", 400);
    const user = yield userRepo.findOne({ where: { id: userId } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    const card = yield cardRepo.findOne({
        where: { id: id }
    });
    if (!card)
        throw new errors_1.default("Card not found!", 404);
    const updatedCard = cardRepo.create(Object.assign(Object.assign({}, card), payload));
    const savedCard = yield cardRepo.save(updatedCard);
    return savedCard;
});
CardService.getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cardRepo = data_source_1.default.getRepository(Card_entity_1.default);
    const card = yield cardRepo.findOne({
        where: { id: id },
        relations: {
            tags: true,
            users: true
        }
    });
    if (!card)
        throw new errors_1.default("Card not found!", 404);
    return card;
});
CardService.getBySprintId = (sprintId) => __awaiter(void 0, void 0, void 0, function* () {
    const cardRepo = data_source_1.default.getRepository(Card_entity_1.default);
    const cards = yield cardRepo.find({
        where: {
            column: {
                sprint: {
                    id: sprintId
                }
            }
        }
    });
    return cards;
});
exports.default = CardService;
