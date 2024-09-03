import { Response,Request } from "express";
import { PrismaClient } from "@prisma/client";
import NodeCache from "node-cache";
import { setCache, getCache } from "../middleware/cache";

const prisma = new PrismaClient()

const homeController = {

  renderHomePage: async (req:Request, res:Response) =>{
    try {
      const cacheKey = "lastPost"
      const cachedPosts = getCache(cacheKey)
      if (cachedPosts) {
        return res.status(200).json(cachedPosts)
      }
      const lastPosts = await prisma.post.findMany({
        orderBy : {
          createdAt: 'desc'
        },
        take: 10
      })
      setCache(cacheKey,lastPosts,3600)
      return res.status(200).json(lastPosts)
    } catch (error) {
      console.error(error)
      return res.status(500).json({error: error})
    }
   
  }
}

export default homeController;