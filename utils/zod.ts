import { z } from "zod";

const zodSchema = {
  User : z.object ({
    name : z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
  }),
  Post : z.object({
    title:z.string(),
    published: z.boolean(),
    content: z.string()
  }),
  Tag : z.object({
    name:z.string()
  }),
  Profile: z.object({
    bio:z.string(),
    avatar:z.string().url()
  })
}

export default zodSchema



