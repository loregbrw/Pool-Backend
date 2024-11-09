"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class ProjectSchema {
}
ProjectSchema.creation = zod_1.z.object({
    name: zod_1.z.string().max(255),
    description: zod_1.z.string().max(500),
    tagId: zod_1.z.string().uuid().optional(),
    users: zod_1.z.array(zod_1.z.string().uuid()),
    sprintInitialDate: zod_1.z.preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : undefined), zod_1.z.date()),
    sprintDuration: zod_1.z.number()
});
ProjectSchema.update = ProjectSchema.creation.partial();
exports.default = ProjectSchema;
