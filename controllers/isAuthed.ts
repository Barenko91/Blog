import { PrismaClient } from "@prisma/client"
import { Response,Request, NextFunction } from "express"
import bcrypt from 'bcrypt'
import zodSchema from "../utils/zod"
import { ZodError } from "zod"
import { generateToken } from "../utils/jwtUtils"
const prisma = new PrismaClient()

const authController = {
  async login (req:Request, res:Response, next:NextFunction){
    const {email, password} = req.body
    try {
      zodSchema.Auth.parse({email,password})
      console.log(email,password)
      const user = await prisma.user.findFirst({
        where: {
          email : email,
        }
      })
      if (!user) {
        const error = new Error("Cette utilisateur n'existe pas.");
        (error as any).details = "Aucun utilisateur trouvé avec cette email.";
        (error as any).status = 401;
        return next(error);
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        const error = new Error("Mot de passe incorect.");
        (error as any).details = "Mot de passe inconnue.",
        (error as any).status = 401
        return next(error)
      }
      const payload = {
        userId : user.id,
        userEmail: user.email,
        admin : user.admin
      }
      const token = generateToken(payload)
      return res.status(200).json(token)
    } catch (err) {
      if (err instanceof ZodError) {
        const error = new Error("Validation des données échoué");
        (error as any).details = err.errors;
        (error as any).status = 400;
        console.log(error)
        return next(error)
      }
      const error = new Error("Une erreur est survenue.");
      (error as any).details = "La promesse n'est pas arriver a terme";
      (error as any).status = 500;
      return next(error)
    }
  },
  async logout (req:Request, res:Response) {
    res.status(200).send('Déconnexion réussie')
  },
}
export default  authController