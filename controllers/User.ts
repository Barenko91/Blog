import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import zodSchema from '../utils/zod'
import bcrypt from 'bcrypt'
import { ZodError } from "zod";
const saltRounds = Number(process.env.SALT)
const prisma = new PrismaClient();  
const error:any = new Error();
const UsersController = {

  getAllUsers: async (req:Request, res:Response, next:NextFunction) => {
    try {
      const result = await prisma.user.findMany({ 
        include: { Post: true, Profile: true } 
      });
      
      return res.status(220).json(result);
    } catch (err) {
      const error = new Error();
      (error as any).details = "Aucun utilisateur présent en BDD.";
      (error as any).status = 500;
      return next(error) 
    }

  },
  getOneUser: async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      const result = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { Post: true, Profile: true }
      });
      return res.status(220).json(result);;
    } catch (err) {
      const error = new Error();
      (error as any).details = "Utilisateur inconnue.";
      (error as any).status = 500
      return next(error) 
    }

  },
  createUser: async (req:Request, res:Response, next:NextFunction) =>{
    const {name, email, firstName , lastName , password} = req.body
    zodSchema.User.parse({name, email, firstName, lastName, password})
     const hashPassword: string = await  bcrypt.hash(password, saltRounds);
    if (!name || !email || !password) {
      const error:any = new Error();
      (error as any).details = 'les champs email, name ou password sont manquant.';
      (error as any).status = 400;
      return next(error);
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
      return res.status(220).json(result)
    } catch (err) {
      const error:any = new Error();
      error.details= 'Création non effectué'
      error.status = 500
      return next(error)
    }
  },
  modifyUser: async (req:Request,res:Response,next:NextFunction) =>{
    const {id} = req.params
    const {name,email, firstName, lastName, password} = req.body
    zodSchema.User.parse({name,email,firstName,lastName,password})
    const hashPassword: string = await  bcrypt.hash(password, saltRounds);
    if (!name || !email || !password) {
      const error:any = new Error();
      error.details= 'Des champs obligatoire sont manquant.'
      error.status = 400
      return next(error)
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
       return res.status(220).json(result)
    } catch (err) {
      const error:any = new Error();
      error.details= 'modification non effectué'
      error.status= 500
      return next(error)
    }
   
  },
  deleteUser: async (req:Request,res:Response,next:NextFunction) =>{
    const {id} = req.params
    try {
      const result = await prisma.user.delete({
        where:{
          id: Number(id)
        }
      })
      return res.status(220).json(result)
      console.log("Supression réussi")
    } catch (err) {
      const error:any = new Error();
      error.details='Suppression non effectué'
      error.status =500
      return next(error)
    }
  },
  createAdmin : async (req:Request, res:Response, next:NextFunction) =>{
    const {name, email, firstName , lastName , password} = req.body
   
    if (!name || !email || !password) {
      const error:any = new Error();
      error.details= 'champs obligatoire manquant'
      error.status= 401
      return next(error)
    }
    try {
      zodSchema.User.parse({name, email, firstName, lastName, password})
      const hashPassword: string = await  bcrypt.hash(password, saltRounds);
      const result = await prisma.user.create({
        data: {
          name,
          email,
          firstName,
          lastName,
          password: hashPassword,
          admin: true
        }
      })
      return res.status(220).json(result)
    } catch (err) {
      if (err instanceof ZodError) {
        const error:any = new Error();
        error.details= 'Validation des données échoué.'
        error.status= 400
      }
      const error:any = new Error();
      error.details= 'création non achevée'
      error.status = 500
      return next(error)
    }
  }
};
export default UsersController;
