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
const EPermission_enum_1 = require("../enums/EPermission.enum");
const BaseEntity_entity_1 = __importDefault(require("./BaseEntity.entity"));
const User_entity_1 = __importDefault(require("./User.entity"));
const Project_entity_1 = __importDefault(require("./Project.entity"));
let Permission = class Permission extends BaseEntity_entity_1.default {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.default, { cascade: true }),
    __metadata("design:type", User_entity_1.default)
], Permission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Project_entity_1.default, { cascade: true }),
    __metadata("design:type", Project_entity_1.default)
], Permission.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 20,
        transformer: {
            to: EPermission_enum_1.permissionToString,
            from: EPermission_enum_1.stringToPermission
        }
    }),
    __metadata("design:type", Number)
], Permission.prototype, "permission", void 0);
Permission = __decorate([
    (0, typeorm_1.Entity)("Permissions")
], Permission);
exports.default = Permission;
