"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class UserSchema {
}
UserSchema.login = zod_1.z.object({
    login: zod_1.z.string().max(255),
    password: zod_1.z.string().max(255)
});
UserSchema.creation = zod_1.z.object({
    name: zod_1.z.string().max(255),
    username: zod_1.z.string().max(50),
    email: zod_1.z.string().max(255),
    birthdate: zod_1.z.string(),
    password: zod_1.z.string().max(100),
    image: zod_1.z.string().max(255).optional()
});
UserSchema.update = UserSchema.creation.partial();
exports.default = UserSchema;
