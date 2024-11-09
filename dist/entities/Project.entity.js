"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BaseEntity_entity_1 = __importDefault(require("./BaseEntity.entity"));
const User_entity_1 = __importDefault(require("./User.entity"));
const Tag_entity_1 = __importDefault(require("./Tag.entity"));
const Permission_entity_1 = __importDefault(require("./Permission.entity"));
const Sprint_entity_1 = __importDefault(require("./Sprint.entity"));
let Project = class Project extends BaseEntity_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.default, { cascade: true }),
    __metadata("design:type", User_entity_1.default)
], Project.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tag_entity_1.default, { cascade: false }),
    __metadata("design:type", Tag_entity_1.default)
], Project.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Permission_entity_1.default, (p) => p.project),
    __metadata("design:type", Array)
], Project.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sprint_entity_1.default, (s) => s.project),
    __metadata("design:type", Array)
], Project.prototype, "sprints", void 0);
Project = __decorate([
    (0, typeorm_1.Entity)("Projects")
], Project);
exports.default = Project;
