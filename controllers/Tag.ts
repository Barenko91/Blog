import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import zodSchema from "../utils/zod";
const prisma = new PrismaClient()

const tagcontrollers = {
  getOneTag :async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params
    if (!req.params) {
      const error:any = new Error()
      error.details= 'req.params non présent.';
      error.status= 400
      return next(error)
    }
    try {
      const result =  await prisma.tag.findUnique({
        where: {id: Number(id)}
      })
      return res.json(result)
    } catch (err) {
      const error:any = new Error()
      error.details= 'Tag non trouvé.'
      error.status = 500
      return next(error) 
       }
  },
  getAllTags : async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const result = await prisma.tag.findMany()
      return res.json(result)
    } catch (err) {
      const error:any = new Error()
      error.details= 'Aucun tags trouvé.'
      error.status = 500
      return next(error)   }
  },
  createTag : async (req:Request , res:Response, next:NextFunction) => {
    const {name} = req.body
    zodSchema.Tag.parse(name)
    if (!name) {
      const error:any = new Error()
      error.details = 'name non fournie.'
      error.status = 400
      return next(error)
    }
    try {
      const result = await prisma.tag.create({
        data: {name: name}
      })

      return res.json(result)
    } catch (err) {
      const error:any = new Error()
      error.details= 'Création annuler une erreure est arrivée'
      error.status = 500
      return next(error)    }
  },
  modifyTag : async (req:Request,  res:Response, next:NextFunction) =>{
    const {name} = req.body
    zodSchema.Tag.parse(name)
    const {id} = req.params
    if (!name) {
      return res.status(400).send("Aucune modificaiton détecté.")
    }
    try {
      const result =  await prisma.tag.update({
        where: {id:Number(id)},
         data: {name:name}
        }
      )
      return res.json(result)
    } catch (err) {
      const error:any = new Error()
      error.details= 'Modification annuler une erreur est survenue.'
      error.status = 500
      return next(error)    }
  },
  deleteTag : async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params
    try {
      const result = await prisma.tag.delete({
        where: {
          id:Number(id)
        }
      })
      return res.json(result)
    } catch (err) {
      const error:any = new Error()
      error.details= 'Suppression annulé une erreur est survenue;'
      error.status = 500
      return next(error)    }
  }
}
export default tagcontrollers
