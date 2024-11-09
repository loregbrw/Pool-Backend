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
const Permission_entity_1 = __importDefault(require("./Permission.entity"));
const Note_entity_1 = __importDefault(require("./Note.entity"));
const Tag_entity_1 = __importDefault(require("./Tag.entity"));
const Card_entity_1 = __importDefault(require("./Card.entity"));
const Notification_entity_1 = __importDefault(require("./Notification.entity"));
let User = class User extends BaseEntity_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Project_entity_1.default, (p) => p.user),
    __metadata("design:type", Array)
], User.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Permission_entity_1.default, (p) => p.user),
    __metadata("design:type", Array)
], User.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Note_entity_1.default, (n) => n.user),
    __metadata("design:type", Array)
], User.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Tag_entity_1.default, (t) => t.user),
    __metadata("design:type", Array)
], User.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Card_entity_1.default),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notification_entity_1.default, (n) => n.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("Users")
], User);
exports.default = User;
