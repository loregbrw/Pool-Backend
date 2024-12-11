import { z } from "zod";

export default class CardSchemas {
    public static creation = z.object({
        name: z.string().max(255),
        description: z.string().max(5000).optional(),
        dueDate: z.preprocess(
            (arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : undefined),
            z.date()
        ).optional(),
        status: z.boolean(),
        index: z.number().int().nonnegative(),
        sectionId: z.string().uuid().optional(),
        columnId: z.string().uuid().optional(),
        tagsId: z.array(z.string().uuid())
    });

    public static move = z.object({
        destColumnId: z.string().uuid(),
        newIndex: z.number().min(0)
    })

    public static update = CardSchemas.creation.partial();
}

export type TCardCreation = z.infer<typeof CardSchemas.creation>;
export type TCardMove = z.infer<typeof CardSchemas.move>;
export type TCardUpdate = z.infer<typeof CardSchemas.update>;
