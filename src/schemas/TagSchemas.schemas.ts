import { z } from "zod";

export default class TagSchemas {

    public static creation = z.object({
        name: z.string().max(255),
        color: z.string().max(255)
    });

    public static update = TagSchemas.creation.partial();
}

export type TTagCreation = z.infer<typeof TagSchemas.creation>;
export type TTagUpdate = z.infer<typeof TagSchemas.update>;