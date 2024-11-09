import { z } from "zod";

export default class ColumnSchema {

    public static creation = z.object({
        name: z.string().max(255),
        index: z.number().int().nonnegative(),
        sprintId: z.string().uuid()
    });

    public static update = ColumnSchema.creation.partial();
}

export type TColumnCreation = z.infer<typeof ColumnSchema.creation>;
export type TColumnUpdate = z.infer<typeof ColumnSchema.update>;