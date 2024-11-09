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
const Permission_entity_1 = __importDefault(require("../entities/Permission.entity"));
const Project_entity_1 = __importDefault(require("../entities/Project.entity"));
const Tag_entity_1 = __importDefault(require("../entities/Tag.entity"));
const User_entity_1 = __importDefault(require("../entities/User.entity"));
const EPermission_enum_1 = require("../enums/EPermission.enum");
const errors_1 = __importDefault(require("../errors"));
const SprintService_service_1 = __importDefault(require("./SprintService.service"));
class ProjectService {
}
_a = ProjectService;
ProjectService.create = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const tagRepo = data_source_1.default.getRepository(Tag_entity_1.default);
    const projectRepo = data_source_1.default.getRepository(Project_entity_1.default);
    const permissionRepo = data_source_1.default.getRepository(Permission_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: userId } });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    const tag = yield tagRepo.findOne({ where: { id: payload.tagId } });
    if (!tag)
        throw new errors_1.default("Invalid Tag!", 400);
    const project = projectRepo.create({ name: payload.name, description: payload.description, status: false, tag: tag, user: user });
    const createdProject = yield projectRepo.save(project);
    const sprintData = {
        name: "Sprint 1",
        initialDate: payload.sprintInitialDate,
        duration: payload.sprintDuration,
        projectId: createdProject.id
    };
    const sprint = yield SprintService_service_1.default.create(sprintData, userId);
    for (const id of payload.users) {
        const foundUser = yield userRepo.findOne({ where: { id: id } });
        if (!foundUser) {
            throw new errors_1.default(`Invalid userId! [${id}]`, 400);
        }
        else {
            const permission = permissionRepo.create({
                user: foundUser,
                project: createdProject,
                permission: EPermission_enum_1.EPermission.EDITOR
            });
            yield permissionRepo.save(permission);
        }
    }
    return Object.assign(Object.assign({}, createdProject), { user: undefined });
});
ProjectService.update = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const projectRepo = data_source_1.default.getRepository(Project_entity_1.default);
    const project = yield projectRepo.findOne({
        where: { id: id },
        relations: {
            user: true
        }
    });
    if (!project)
        throw new errors_1.default("Project not found!", 400);
    if (((_b = project.user) === null || _b === void 0 ? void 0 : _b.id) !== userId)
        throw new errors_1.default("Unathorized!", 401);
    const updatedProject = projectRepo.create(Object.assign(Object.assign({}, project), payload));
    const savedProject = yield projectRepo.save(updatedProject);
    return Object.assign(Object.assign({}, savedProject), { user: undefined });
});
ProjectService.delete = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const projectRepo = data_source_1.default.getRepository(Project_entity_1.default);
    const project = yield projectRepo.findOne({
        where: { id: id },
        relations: {
            user: true
        }
    });
    if (!project)
        throw new errors_1.default("Project not found!", 400);
    if (((_b = project.user) === null || _b === void 0 ? void 0 : _b.id) !== userId)
        throw new errors_1.default("Unathorized!", 401);
    yield projectRepo.softDelete(id);
});
ProjectService.getById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const projectRepo = data_source_1.default.getRepository(Project_entity_1.default);
    const permissionRepo = data_source_1.default.getRepository(Permission_entity_1.default);
    const user = yield userRepo.findOne({ where: { id: userId } });
    if (!user)
        throw new errors_1.default("User authentication failed!", 401);
    const project = yield projectRepo.findOne({
        where: { id: id },
        relations: {
            user: true,
            sprints: true,
            permissions: true
        }
    });
    if (!project)
        throw new errors_1.default("Project not found!", 404);
    if (((_b = project.user) === null || _b === void 0 ? void 0 : _b.id) !== user.id) {
        const permission = yield permissionRepo.findOne({
            where: {
                project,
                user
            }
        });
        if (!permission)
            throw new errors_1.default("Forbidden access!", 403);
        return { project: Object.assign(Object.assign({}, project), { user: undefined, permissions: undefined }), permission: (_c = permission.permission) === null || _c === void 0 ? void 0 : _c.toString() };
    }
    return { project: Object.assign(Object.assign({}, project), { user: undefined, permissions: undefined }), permission: "Own" };
});
ProjectService.getByUser = (userId, search) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(User_entity_1.default);
    const user = yield userRepo.findOne({
        where: { id: userId },
        relations: {
            projects: {
                tag: true,
                permissions: true,
            },
            permissions: {
                project: {
                    tag: true,
                    permissions: true,
                }
            }
        }
    });
    if (!user)
        throw new errors_1.default("Problem authenticating user!", 401);
    const ownProjects = (user.projects || []).filter(project => { var _b; return (_b = project.name) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(search.toLowerCase()); });
    const ownProjectsWithStatus = ownProjects.map(project => ({
        project,
        status: "Owner",
    }));
    const permissions = user.permissions || [];
    const permissionProjects = permissions
        .filter(permission => { var _b, _c; return (_c = (_b = permission.project) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(search.toLowerCase()); })
        .map(permission => {
        var _b;
        return ({
            project: permission.project,
            status: (_b = permission.permission) === null || _b === void 0 ? void 0 : _b.toString(),
        });
    });
    const allProjects = [...ownProjectsWithStatus, ...permissionProjects];
    return allProjects;
});
exports.default = ProjectService;
