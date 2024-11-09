import { z } from "zod";

export default class UserSchema {

    public static login = z.object({
        login: z.string().max(255),
        password: z.string().max(255)
    })

    public static creation = z.object({
        name: z.string().max(255),
        username: z.string().max(50),
        email: z.string().max(255),
        birthdate: z.string(),
        password: z.string().max(100),
        image: z.string().max(255).optional()
    });

    public static update = UserSchema.creation.partial();
}

export type TUserLogin = z.infer<typeof UserSchema.login>;
export type TUserCreation = z.infer<typeof UserSchema.creation>;
export type TUserUpdate = z.infer<typeof UserSchema.update>;