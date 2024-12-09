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

    public static moveColumn = z.object({
        columnId: z.string().uuid(),
        newIndex: z.number()
    });

    public static reorderColumns = z.object({
        columns: z.array(z.string().uuid())
    });

    public static update = SprintSchema.creation.partial();
}

export type TSprintCreation = z.infer<typeof SprintSchema.creation>;
export type TSprintMoveColumn = z.infer<typeof SprintSchema.moveColumn>;
export type TSprintReorderColumns = z.infer<typeof SprintSchema.reorderColumns>;
export type TSprintUpdate = z.infer<typeof SprintSchema.update>;