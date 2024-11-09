"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class SectionSchema {
}
SectionSchema.creation = zod_1.z.object({
    name: zod_1.z.string().max(255),
    color: zod_1.z.string().max(255),
    index: zod_1.z.number().int().nonnegative(),
    columnId: zod_1.z.string().uuid()
});
SectionSchema.update = SectionSchema.creation.partial();
exports.default = SectionSchema;
