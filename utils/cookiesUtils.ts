import { Response } from "express";

export default function setAuthCookies(res:Response, user: {email:string , id:number}) {
const cookieOptions = {
  domain: 'localhost',
  path:'/',
  secure:false,
  signed:true,
  maxAge: 12*60*60*1000
};
res.cookie('userEmail', user.email, cookieOptions)
res.cookie('userId', user.id , cookieOptions)
}