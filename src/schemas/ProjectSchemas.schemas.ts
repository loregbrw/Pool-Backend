import { z } from "zod";

export default class ProjectSchema {

    public static creation = z.object({
        name: z.string().max(255),
        description: z.string().max(500),
        tagId: z.string().uuid(),
        users: z.array(z.string().uuid()),
        sprintInitialDate: z.preprocess(
            (arg) => (typeof arg === 'string' || arg instanceof Date ? new Date(arg) : undefined),
            z.date()
        ),
        sprintDuration: z.number()
    })

    public static update = ProjectSchema.creation.partial();
}

export type TProjectCreation = z.infer<typeof ProjectSchema.creation>;
export type TProjectUpdate = z.infer<typeof ProjectSchema.update>;