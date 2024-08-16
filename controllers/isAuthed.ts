import { PrismaClient } from "@prisma/client"
import { Response,Request } from "express"
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()
const authController = {
  async isAuthed (req:Request, res:Response){
    const {email , password} = req.body
   console.log("Cookie" , req.cookies)
  }
}
export default  authController