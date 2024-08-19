import jwt, { Secret } from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import 'dotenv/config'

function generateToken (data: any){
  if (!process.env.TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined in environment variables');
  }
  return jwt.sign(data, process.env.TOKEN_SECRET as Secret, {expiresIn : '15m' })
}
function authenticateToken (req:Request, res:Response, next:NextFunction){
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    console.log("token is null")
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.TOKEN_SECRET as Secret, (err:any, user:any) =>{
    if(err){
      console.log("token failed",err) 
      return res.sendStatus(403)
    }
      req.user = user
      next();
  });
}

export {generateToken, authenticateToken}