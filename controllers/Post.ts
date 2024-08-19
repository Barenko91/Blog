import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import zodSchema from "../utils/zod";
const prisma = new PrismaClient();

const PostController = {
  getAllPosts: async (req:Request, res:Response, next:NextFunction) => {
    try {
      const result = await prisma.post.findMany({
        include: { 
          User: {
            select: { name: true, email: true }
          } 
        }
      });
      return res.status(200).json(result);
    } catch (err) {
      const error:any = new Error()
      error.details="les post n'ont pas été trouvé."
      error.status=500

    }

  },
  getOnePost: async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      const result = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: { User: true }
      });
      res.status(200).json(result);
    } catch (err) {
      const error:any = new Error()
      error.details="Le post n'a pas été trouvé."
      error.status=500
      
    }

  },
  creatPost: async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params
    try {
      const { title, content} = req.body;
      zodSchema.Post.parse({title,content})
      if (!title || !content) {
        const error:any = new Error()
        error.details='titre ou content manquant'
        error.status=400
      }
      const result = await prisma.post.create({
        data: {
          title,
          content,
          authorId: Number(id)
        }
      });
      return res.status(200).json(result);
    } catch (err) {
      const error:any = new Error()
      error.details="Création annulé"
      error.status=500

    }
  },
  modifyPost : async (req:any, res:Response, next:NextFunction) => {
    try {
      const {id} = req.params
      if (!req.params) {
        const error:any = new Error()
        error.details= 'req.params manquant'
        error.status=400
      }
      const {content, title} = req.body
      if (!title || !content) {
        const error:any = new Error()
        error.details='titre ou content manquant'
        error.status=400
      }
      const result = await prisma.post.update({
        where: {
          id: Number(id)
        },
        data: {
          title: title,
          content: content
        }
      })
      return res.status(200).json(result);
    } catch (err) {
      const error:any = new Error()
      error.details="Modification annulé"
      error.status=500
    }
  },
  deletePost : async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      if (!req.params) {
        const error:any = new Error()
        error.details='req.params manquant'
        error.status=400
      }
      const result = await prisma.post.delete({
        where: { id: Number(id) }
      });
      return res.status(200).json(result);
    } catch (err) {
      const error:any = new Error()
      error.details="Suppression annulé"
      error.status=500

    }
  },
};


export default PostController;