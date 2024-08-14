import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const PostController = {
  getAllPosts: async (req: any, res: any) => {
    try {
      const result = await prisma.post.findMany({
        include: { 
          User: {
            select: { name: true, email: true }
          } 
        }
      });
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

  },
  getOnePost: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const result = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: { User: true }
      });
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }

  },
  creatPost: async (req: any, res: any) => {
    try {
      const { title, content, userId } = req.body;
      if (!title || !content || !userId) {
        return res.status(400).send('Les champs title, content et userId sont requis.')
      }
      const result = await prisma.post.create({
        data: {
          title,
          content,
          authorId: Number(userId)
        }
      });
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Erreur du serveur');
    }
  },
  modifyPost : async (req:any, res:any) => {
    try {
      const {id} = req.params
      const {content, title} = req.body
      const result = await prisma.post.update({
        where: {
          id: Number(id)
        },
        data: {
          title: title,
          content: content
        }
      })
      res.json(result)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  },
  deletePost : async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const result = await prisma.post.delete({
        where: { id: Number(id) }
      });
      res.json(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  },
};


export default PostController;