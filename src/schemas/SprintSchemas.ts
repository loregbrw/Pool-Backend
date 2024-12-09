import { z } from "zod";

export default class SprintSchema {

    public static creation = z.object({
        name: z.string().max(255),
        projectId: z.string().uuid(),
        initialDate: z.preprocess(
            (arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : undefined),
            z.date()
        ),
        duration: z.number()
    });

    public static reorder = z.object({
        columnId: z.string().uuid(),
        newIndex: z.number()
    });

    public static update = SprintSchema.creation.partial();
}

export type TSprintCreation = z.infer<typeof SprintSchema.creation>;
export type TSprintReorder = z.infer<typeof SprintSchema.reorder>;
export type TSprintUpdate = z.infer<typeof SprintSchema.update>;