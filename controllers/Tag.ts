import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import zodSchema from "../utils/zod";
const prisma = new PrismaClient()

const tagcontrollers = {
  getOneTag :async (req:Request, res:Response) => {
    const {id} = req.params
    if (!req.params) {
      return res.status(400).send("Une erreur est survenue.")
    }
    try {
      const result =  await prisma.tag.findUnique({
        where: {id: Number(id)}
      })
      return res.json(result)
    } catch (error) {
      console.error(error)
      return res.status(500).send("Une erreur est survenue.")
    }
  },
  getAllTags : async (req:Request, res:Response) =>{
    try {
      const result = await prisma.tag.findMany()
      return res.json(result)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Une erreur est survenue')
    }
  },
  createTag : async (req:Request , res:Response) => {
    const {name} = req.body
    zodSchema.Tag.parse(name)
    if (!name) {
      return res.status(400).send('Veuiller donnnées un nom à votre tag')
    }
    try {
      const result = await prisma.tag.create({
        data: {name: name}
      })

      return res.json(result)
    } catch (error) {
      console.error(error)
      return res.status(500).send("Une erreur est survenue.")
    }
  },
  modifyTag : async (req:Request,  res:Response) =>{
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
    } catch (error) {
      console.error(error)
      return res.status(500).send("Une erreur est survenue.")
    }
  },
  deleteTag : async (req:Request, res:Response) => {
    const {id} = req.params
    try {
      const result = await prisma.tag.delete({
        where: {
          id:Number(id)
        }
      })
      return res.json(result)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Une erreur est survenue.')
    }
  }
}
export default tagcontrollers
