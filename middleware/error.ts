import { Response,Request, NextFunction } from "express";
import logger from "../utils/logger";
function errorHandler (err:any,req:Request,res:Response,next:NextFunction){
logger.error(err.stack);
res.status(err.status || 500).json({
  message: err.message || "Une erreur est survenue",
  details : err.details || null,
})
}

export default errorHandler;