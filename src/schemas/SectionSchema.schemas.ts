import { z } from "zod";

export default class SectionSchema {

    public static creation = z.object({
        name: z.string().max(255),
        color: z.string().max(255),
        index: z.number().int().nonnegative(),
        columnId: z.string().uuid()
    });

    public static update = SectionSchema.creation.partial();
}

export type TSectionCreation = z.infer<typeof SectionSchema.creation>;
export type TSectionUpdate = z.infer<typeof SectionSchema.update>;