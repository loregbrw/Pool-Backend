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
const Card_entity_1 = __importDefault(require("./Card.entity"));
const Sprint_entity_1 = __importDefault(require("./Sprint.entity"));
const Section_entity_1 = __importDefault(require("./Section.entity"));
let CardsColumn = class CardsColumn extends BaseEntity_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CardsColumn.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CardsColumn.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sprint_entity_1.default, { cascade: true }),
    __metadata("design:type", Sprint_entity_1.default)
], CardsColumn.prototype, "sprint", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Card_entity_1.default, (c) => c.column),
    __metadata("design:type", Array)
], CardsColumn.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Section_entity_1.default, (s) => s.column),
    __metadata("design:type", Array)
], CardsColumn.prototype, "sections", void 0);
CardsColumn = __decorate([
    (0, typeorm_1.Entity)("CardsColumn")
], CardsColumn);
exports.default = CardsColumn;
