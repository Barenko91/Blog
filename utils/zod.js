"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zodSchema = {
    User: zod_1.z.object({
        name: zod_1.z.string().min(1, "Le nom est requis"),
        email: zod_1.z.string().email("Email invalide"),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        password: zod_1.z.string().min(12, "Le mots de passe doit contenier au moin 12 caractères"),
        admin: zod_1.z.boolean().optional()
    }),
    Post: zod_1.z.object({
        title: zod_1.z.string().min(2),
        published: zod_1.z.boolean(),
        content: zod_1.z.string().min(2)
    }),
    Tag: zod_1.z.object({
        name: zod_1.z.string().min(2)
    }),
    Profile: zod_1.z.object({
        bio: zod_1.z.string().min(2),
        avatar: zod_1.z.string().url()
    }),
    Auth: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(12)
    })
};
exports.default = zodSchema;
