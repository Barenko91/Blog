import { Response,Request, NextFunction } from "express";
function errorHandler (err:any,req:Request,res:Response,next:NextFunction){
console.error(err.stack);
res.status(err.status || 500).json({
  message: err.message || "Une erreur est survenue",
  details : err.details || null,
})
}

export default errorHandler;