import { Response,Request,NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import zodSchema from "../utils/zod";
const prisma = new PrismaClient()
const saltRounds =Number(process.env.SALT)
const adminController = {

  async renderAdminPage (req:Request,res:Response){

    const {id} = req.params
    if (!req.params) {
      const error:any = new Error()
      error.detail='req.params manquant'
      error.status=401
    }
    try {
      const userData = prisma.user.findFirst({
        where: {
          id: Number(id)
        }
      })
      res.status(200).json(userData)
    } catch (err) {
      const error:any = new Error()
      error.details='Utilisateur non trouvé.'
      error.status= 500;
    }
  },
  async modifyAdmin(req:Request, res:Response){
    const {id} = req.params;
    const {name , email , password, firstName, lastName} = req.body;
    try {
      zodSchema.User.parse({name , email , password, firstName, lastName})
      const hashPassword = await bcrypt.hash(password,saltRounds)
      const result = await prisma.user.update({
        where:{id:Number(id)},
        data: {
          name:name,
          email:email,
          password:hashPassword,
          firstName:firstName,
          lastName:lastName
        },
      })
      return res.status(200).json(result)
    } catch (err) {
      const error:any = new Error("Une erreur est survenue.")
      error.details = "Probleme de connexion a la BDD!"
      error.status= 500
    }
  
    
  },
  async createAdmin(req:Request,res:Response){
    const {name,email,password,lastName,firstName} = req.body
    
    if(!name ||!email || !password){
      const error:any= new Error()
      error.details='les champs obligatoire sont manquuant (pseudo,email et password).'
      error.status=401
    }
    zodSchema.User.parse({name, email, firstName, lastName, password})
    
    const hashPassword: string = await bcrypt.hash(password, saltRounds);
  
    try {
    
      const result = await prisma.user.create({
        data: {
          name:name,
          email:email,
          firstName:firstName,
          lastName:lastName,
          password: hashPassword,
          admin:true
        }
      })
      console.log("RESULT :",result)
      return res.status(200).json(result)
    } catch (err) {
      const error:any = new Error()
      error.details='Création annulé une erreur est apparue.'
      error.status=500 
     }

  },
  async deleteAdmin (req:Request,res:Response){
    const {id} = req.params;
    if (!req.params) {
      const error:any = new Error()
      error.details= 'req.params manquant.'
      error.status=401
    }
    try {
     await prisma.user.delete({
        where:{
          id: Number(id)
        }
      })
      return res.status(200).json({message: "Utilisteur supprimer avec succès !"} )
    } catch (err) {
      const error:any = new Error()
      error.details = 'Suppression annulé une erreur est survenue.'
      error.status= 500;
    }
  }
}

export default adminController