import { Router } from "express";
import UsersController from "./controllers/User";
import PostController from "./controllers/Post";
const router = Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
router.get("/", PostController.getAllPosts); 
router.get("/post/:id", PostController.getOnePost);

router.post("/post", PostController.creatPost)
      .put("/post/:id", PostController.modifyPost)
      .delete("/post/:id", PostController.deletePost);

router.get("/users", UsersController.getAllUsers);
router.get("/users/:id" , UsersController.getOneUser);
router.post("/user" , UsersController.createUser)
      .put("/user/:id" , UsersController.modifyUser)
      .delete("/user/:id" , UsersController.deleteUser)

export default router;