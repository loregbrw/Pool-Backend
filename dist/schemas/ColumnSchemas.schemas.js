"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class ColumnSchema {
}
ColumnSchema.creation = zod_1.z.object({
    name: zod_1.z.string().max(255),
    index: zod_1.z.number().int().nonnegative(),
    sprintId: zod_1.z.string().uuid()
});
ColumnSchema.update = ColumnSchema.creation.partial();
exports.default = ColumnSchema;
