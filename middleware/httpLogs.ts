import { Request,Response,NextFunction } from "express";
import logger from "../utils/logger";
const adminStats = {
  Home: 0,
  CreatedAccounts : 0,
  DeletedAccounts :0
}
const httpLogger = function(req:Request,res:Response,next:NextFunction){
  logger.http(`HTTP ${req.method} ${req.url}`)
  switch (req.method) {
    case 'GET':
      if (req.url === '/') {
        adminStats.Home += 1
      }
      break;
    case 'POST':
      if (req.url === '/user') {
        adminStats.CreatedAccounts += 1
      }
      break;
    case 'DELETE':
     if (req.url.startsWith('/user/')) {
      adminStats.DeletedAccounts += 1
     }
      break;
  }
  next();
}
export const getHttpStats = (req:Request,res:Response,next:NextFunction)=>{
  res.json(adminStats)
}
export default httpLogger;