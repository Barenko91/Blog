"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zodSchema = {
    User: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        password: zod_1.z.string()
    }),
    Post: zod_1.z.object({
        title: zod_1.z.string(),
        published: zod_1.z.boolean(),
        content: zod_1.z.string()
    }),
    Tag: zod_1.z.object({
        name: zod_1.z.string()
    }),
    Profile: zod_1.z.object({
        bio: zod_1.z.string(),
        avatar: zod_1.z.string().url()
    })
};
exports.default = zodSchema;
