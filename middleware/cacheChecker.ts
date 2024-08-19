import { Request,Response,NextFunction } from "express"
import NodeCache from "node-cache"
const cache = new NodeCache({stdTTL: 3600})

const checkCache = (req:Request,res:Response,next:NextFunction) => {
  const {id} = req.params
  if(id){
    const cacheData = cache.get(id)
    if (cacheData) {
      return res.json(cacheData)
    }
  }
  next()
}