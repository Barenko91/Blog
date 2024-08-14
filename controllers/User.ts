
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();  

const UsersController = {

  getAllUsers: async (req: any, res: any) => {
    try {
      const result = await prisma.user.findMany({ 
        include: { Post: true, Profile: true } 
      });
      
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

  },
  getOneUser: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const result = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { Post: true, Profile: true }
      });
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

  },
  createUser: async (req:any, res:any) =>{
    const {name, email} = req.body
    if (!name || !email) {
      return res.status(400).send("le nom et l'email sont obligatoire ! ")
    }
    try {
      const result = await prisma.user.create({
        data: {
          name: name,
          email: email
        }
      })
      res.json(result)
      console.log(result)
    } catch (error) {
      console.error(error)
     return  res.status(500).send('Une erreur est apparue durant la création de votre profile')
    }

  },
  modifyUser: async (req:any,res:any) =>{
    const {id} = req.params
    const {name,email} = req.body
    console.log(req.body)
    if (!name || !email) {
      return res.status(400).send("Vous n'avez rien modifier si vous voulez modifier un champs veuiller le remplir avec la nouvelle données Merci")
    }
    try {
      const result = await prisma.user.update({
        where: {
         id: Number(id),
        },
        data : {
         name:name,
         email: email
        }
       })
       res.json(result)
    } catch (error) {
      console.error(error)
     return  res.status(500).send("Une erreur est survenue ! ")
    }
   
  },
  deleteUser: async (req:any,res:any) =>{
    const {id} = req.params
    try {
      const result = await prisma.user.delete({
        where:{
          id: Number(id)
        }
      })
      res.json(result)
      console.log("Supression réussi")
    } catch (error) {
      console.error(error)
      return res.status(500).send("Une erreur est survenue veuillez reéssayer")
    }
  }
};


export default UsersController;
