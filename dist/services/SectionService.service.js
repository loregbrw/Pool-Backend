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
const Section_entity_1 = __importDefault(require("../entities/Section.entity"));
const errors_1 = __importDefault(require("../errors"));
const CardsColumn_entity_1 = __importDefault(require("../entities/CardsColumn.entity"));
class SectionService {
}
_a = SectionService;
SectionService.create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sectionRepo = data_source_1.default.getRepository(Section_entity_1.default);
    const columnRepo = data_source_1.default.getRepository(CardsColumn_entity_1.default);
    const column = yield columnRepo.findOne({ where: { id: payload.columnId } });
    if (!column)
        throw new errors_1.default("Column not found!", 404);
    const section = sectionRepo.create(Object.assign(Object.assign({}, payload), { column: column }));
    const createdSection = yield sectionRepo.save(section);
    return createdSection;
});
exports.default = SectionService;
