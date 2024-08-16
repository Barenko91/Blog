import { Router } from "express";
import UsersController from "./controllers/User";
import PostController from "./controllers/Post";
import tagController from "./controllers/Tag"
import isAuthed from "./controllers/isAuthed";
const router = Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});  
router.get("/", PostController.getAllPosts)
      .get("/post/:id", PostController.getOnePost)
      .post("/post", PostController.creatPost)
      .put("/post/:id", PostController.modifyPost)
      .delete("/post/:id", PostController.deletePost);

router.get("/users", UsersController.getAllUsers)
      .get("/users/:id" , UsersController.getOneUser)
      .post("/user" , UsersController.createUser)
      .put("/user/:id" , UsersController.modifyUser)
      .delete("/user/:id" , UsersController.deleteUser);

router.get("/tags" , tagController.getAllTags)
      .get("/tag/:id" , tagController.getOneTag)
      .post("/tag" , tagController.createTag)
      .put("/tag/:id", tagController.modifyTag)
      .delete("/tag/:id" , tagController.deleteTag);

     

export default router;