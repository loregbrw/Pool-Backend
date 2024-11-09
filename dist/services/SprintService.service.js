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
const Project_entity_1 = __importDefault(require("../entities/Project.entity"));
const Sprint_entity_1 = __importDefault(require("../entities/Sprint.entity"));
const User_entity_1 = __importDefault(require("../entities/User.entity"));
const errors_1 = __importDefault(require("../errors"));
class SprintService {
}
_a = SprintService;
SprintService.create = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sprintRepo = data_source_1.default.getRepository(Sprint_entity_1.default);
    const projectRepo = data_source_1.default.getRepository(Project_entity_1.default);
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: userId } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    // verificar se o usuario tem permição ou se é viewer
    const project = yield projectRepo.findOne({ where: { id: payload.projectId } });
    if (!project)
        throw new errors_1.default("Project not found", 404);
    const sprint = sprintRepo.create(Object.assign(Object.assign({}, payload), { project: project, status: false }));
    const createdSprint = yield sprintRepo.save(sprint);
    return createdSprint;
});
SprintService.update = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sprintRepo = data_source_1.default.getRepository(Sprint_entity_1.default);
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: userId } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    // verificar se o usuario tem permição ou se é viewer
    const sprint = yield sprintRepo.findOne({
        where: { id: id }
    });
    if (!sprint)
        throw new errors_1.default("Sprint not found!", 404);
    const updatedSprint = sprintRepo.create(Object.assign(Object.assign({}, sprint), payload));
    const savedSprint = yield sprintRepo.save(updatedSprint);
    return savedSprint;
});
SprintService.getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sprintRepo = data_source_1.default.getRepository(Sprint_entity_1.default);
    const sprint = yield sprintRepo.findOne({
        where: { id: id },
        relations: {
            columns: {
                cards: true,
                sections: true
            }
        }
    });
    if (!sprint)
        throw new errors_1.default("Sprint not found!", 404);
    return sprint;
});
exports.default = SprintService;
