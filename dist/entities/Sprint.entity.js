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
const Project_entity_1 = __importDefault(require("./Project.entity"));
const CardsColumn_entity_1 = __importDefault(require("./CardsColumn.entity"));
let Sprint = class Sprint extends BaseEntity_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sprint.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Sprint.prototype, "initialDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sprint.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Sprint.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Project_entity_1.default, { cascade: true }),
    __metadata("design:type", Project_entity_1.default)
], Sprint.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CardsColumn_entity_1.default, (c) => c.sprint),
    __metadata("design:type", Array)
], Sprint.prototype, "columns", void 0);
Sprint = __decorate([
    (0, typeorm_1.Entity)("Sprints")
], Sprint);
exports.default = Sprint;
