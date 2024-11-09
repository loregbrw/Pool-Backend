"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class SprintSchema {
}
SprintSchema.creation = zod_1.z.object({
    name: zod_1.z.string().max(255),
    projectId: zod_1.z.string().uuid(),
    initialDate: zod_1.z.preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : undefined), zod_1.z.date()),
    duration: zod_1.z.number()
});
SprintSchema.update = SprintSchema.creation.partial();
exports.default = SprintSchema;
