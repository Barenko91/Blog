import { Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const adminChecker = function (req:Request,res:Response,next:NextFunction){
  const token = req.headers.authorization?.split(" ")[1];
  const secret = process.env.TOKEN_SECRET
  if(!token){
    const error:any = new Error()
    error.details = 'Accès non autorisé'
    error.status=401
    return next(error)
  }
  if (!secret) {
    const error:any = new Error()
    error.details = 'Secret non atteignable.'
    error.status=500
    return next(error)
  }
  try {
    const decodedToken = jwt.verify(token, secret)
    if (typeof decodedToken !== 'string' && decodedToken.admin === false) {
     const error:any = new Error()
     error.details = 'Accés interdit'
     error.status=403
     return next(error)
    }
    next()
  } catch (err) {
    const error:any = new Error()
    error.details='Token invalide'
    error.status=401
    next(error)
  }
}

export default adminChecker;