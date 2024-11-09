"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class TagSchemas {
}
TagSchemas.creation = zod_1.z.object({
    name: zod_1.z.string().max(255),
    color: zod_1.z.string().max(255)
});
TagSchemas.update = TagSchemas.creation.partial();
exports.default = TagSchemas;
