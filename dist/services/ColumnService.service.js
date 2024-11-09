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
const CardsColumn_entity_1 = __importDefault(require("../entities/CardsColumn.entity"));
const Sprint_entity_1 = __importDefault(require("../entities/Sprint.entity"));
const User_entity_1 = __importDefault(require("../entities/User.entity"));
const errors_1 = __importDefault(require("../errors"));
class ColumnService {
}
_a = ColumnService;
ColumnService.create = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // adicionar verificação de editor e owner
    const columnRepo = data_source_1.default.getRepository(CardsColumn_entity_1.default);
    const sprintRepo = data_source_1.default.getRepository(Sprint_entity_1.default);
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: userId } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    const sprint = yield sprintRepo.findOne({ where: { id: payload.sprintId } });
    if (!sprint)
        throw new errors_1.default("Sprint not found!", 404);
    const column = columnRepo.create({ name: payload.name, index: payload.index, sprint: sprint });
    const createdColumn = yield columnRepo.save(column);
    return createdColumn;
});
ColumnService.update = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const columnRepo = data_source_1.default.getRepository(CardsColumn_entity_1.default);
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: userId } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    const column = yield columnRepo.findOne({
        where: { id: id }
    });
    if (!column)
        throw new errors_1.default("Column not found!", 404);
    const updatedColumn = columnRepo.create(Object.assign(Object.assign({}, column), payload));
    const savedColumn = yield columnRepo.save(updatedColumn);
    return savedColumn;
});
exports.default = ColumnService;
