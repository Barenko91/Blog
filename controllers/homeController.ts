import { Response,Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const homeController = {

  renderHomeController : async (req:Request, res:Response) =>{
    try {
      const lastPosts = await prisma.post.findMany({
        orderBy : {
          createdAt: 'desc'
        },
        take: 10
      })
      return res.status(200).json(lastPosts)
    } catch (error) {
      console.error(error)
      return res.status(500).json({error: error})
    }
   
  }
}

export default homeController;