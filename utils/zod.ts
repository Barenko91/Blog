import { z } from "zod";

const zodSchema = {
  User : z.object ({
    name : z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().min(12, "Le mots de passe doit contenier au moin 12 caractères"),
    admin: z.boolean().optional()
  }),
  Post : z.object({
    title:z.string().min(2),
    published: z.boolean(),
    content: z.string().min(2)
  }),
  Tag : z.object({
    name:z.string().min(2)
  }),
  Profile: z.object({
    bio:z.string().min(2),
    avatar:z.string().url()
  }),
  Auth: z.object({
    email: z.string().email(),
    password: z.string().min(12)
  })
}

export default zodSchema



