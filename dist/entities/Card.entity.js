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
const CardsColumn_entity_1 = __importDefault(require("./CardsColumn.entity"));
const Section_entity_1 = __importDefault(require("./Section.entity"));
const CardTag_1 = __importDefault(require("./CardTag"));
const User_entity_1 = __importDefault(require("./User.entity"));
let Card = class Card extends BaseEntity_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Card.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 5000, nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Card.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Card.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CardsColumn_entity_1.default, { cascade: true, nullable: true }),
    __metadata("design:type", CardsColumn_entity_1.default)
], Card.prototype, "column", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Card.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Section_entity_1.default, { cascade: true, nullable: true }),
    __metadata("design:type", Section_entity_1.default)
], Card.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => CardTag_1.default),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Card.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_entity_1.default),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Card.prototype, "users", void 0);
Card = __decorate([
    (0, typeorm_1.Entity)("Cards")
], Card);
exports.default = Card;
