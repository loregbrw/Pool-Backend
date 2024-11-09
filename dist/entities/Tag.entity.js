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
const Project_entity_1 = __importDefault(require("./Project.entity"));
let Tag = class Tag extends BaseEntity_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tag.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.default, { cascade: true }),
    __metadata("design:type", User_entity_1.default)
], Tag.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Project_entity_1.default, (p) => p.tag),
    __metadata("design:type", Array)
], Tag.prototype, "projects", void 0);
Tag = __decorate([
    (0, typeorm_1.Entity)("Tags")
], Tag);
exports.default = Tag;
