import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import zodSchema from '../utils/zod'
import bcrypt from 'bcrypt'
const saltRounds = Number(process.env.SALT)
const prisma = new PrismaClient();  

const UsersController = {

  getAllUsers: async (req:Request, res:Response) => {
    try {
      const result = await prisma.user.findMany({ 
        include: { Post: true, Profile: true } 
      });
      
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

  },
  getOneUser: async (req:Request, res:Response) => {
    try {
      const { id } = req.params;
      const result = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { Post: true, Profile: true }
      });
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

  },
  createUser: async (req:Request, res:Response) =>{
    const {name, email, firstName , lastName , password} = req.body
    zodSchema.User.parse({name, email, firstName, lastName, password})
     const hashPassword: string = await  bcrypt.hash(password, saltRounds);
    if (!name || !email || !password) {
      return res.status(400).send("Merci de renseigner tous les champs.")
    }
    try {
      const result = await prisma.user.create({
        data: {
          name,
          email,
          firstName,
          lastName,
          password: hashPassword
        }
      })
      res.json(result)
      console.log(result)
    } catch (error) {
      console.error(error)
     return  res.status(500).send('Une erreur est apparue durant la création de votre profil')
    }

  },
  modifyUser: async (req:Request,res:Response) =>{
    const {id} = req.params
    const {name,email, firstName, lastName, password} = req.body
    zodSchema.User.parse({name,email,firstName,lastName,password})
    const hashPassword: string = await  bcrypt.hash(password, saltRounds);
    if (!name || !email || !password) {
      return res.status(400).send("Vous n'avez rien modifier si vous voulez modifier un champs veuiller le remplir avec la nouvelle données Merci")
    }
    try {
      const result = await prisma.user.update({
        where: {
         id: Number(id),
        },
        data : {
         name,
         email,
         firstName,
         lastName,
         password: hashPassword
        }
       })
       res.json(result)
    } catch (error) {
      console.error(error)
     return  res.status(500).send("Une erreur est survenue ! ")
    }
   
  },
  deleteUser: async (req:Request,res:Response) =>{
    const {id} = req.params
    try {
      const result = await prisma.user.delete({
        where:{
          id: Number(id)
        }
      })
      res.json(result)
      console.log("Supression réussi")
    } catch (error) {
      console.error(error)
      return res.status(500).send("Une erreur est survenue veuillez reéssayer")
    }
  }
};
export default UsersController;
