import { z } from "zod";

export default class CardSchema {
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

    public static update = CardSchema.creation.partial(); // transforma todos os campos em opcionais
}

// Aqui usamos o z.infer para gerar os tipos automaticamente
export type TCardCreation = z.infer<typeof CardSchema.creation>;
export type TCardUpdate = z.infer<typeof CardSchema.update>;
