"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class CardSchemas {
}
CardSchemas.creation = zod_1.z.object({
    name: zod_1.z.string().max(255),
    description: zod_1.z.string().max(5000).optional(),
    dueDate: zod_1.z.preprocess((arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : undefined), zod_1.z.date()).optional(),
    status: zod_1.z.boolean(),
    index: zod_1.z.number().int().nonnegative(),
    sectionId: zod_1.z.string().uuid().optional(),
    columnId: zod_1.z.string().uuid().optional(),
    tagsId: zod_1.z.array(zod_1.z.string().uuid())
});
CardSchemas.update = CardSchemas.creation.partial();
exports.default = CardSchemas;
