import { Router } from "express";
import UsersController from "./controllers/User";
import PostController from "./controllers/Post";
import tagController from "./controllers/Tag"
import authController from "./controllers/isAuthed";
import homeController from "./controllers/homeController";
import { authenticateToken } from "./utils/jwtUtils";
const router = Router();
 
router.post("/login" , authController.login)
      .get("/", homeController.renderHomeController);

// router.use(authenticateToken);

router.get('/logout' , authController.logout);

router.get("/post", PostController.getAllPosts)
      .get("/post/:id", PostController.getOnePost)
      .post("/post", PostController.creatPost)
      .put("/post/:id", PostController.modifyPost)
      .delete("/post/:id", PostController.deletePost);

router.get("/users", UsersController.getAllUsers)
      .get("/users/:id" , UsersController.getOneUser)
      .post("/user" , UsersController.createUser)
      .post("/admin", UsersController.createAdmin)
      .put("/user/:id" , UsersController.modifyUser)
      .delete("/user/:id" , UsersController.deleteUser);

router.get("/tags" , tagController.getAllTags)
      .get("/tag/:id" , tagController.getOneTag)
      .post("/tag" , tagController.createTag)
      .put("/tag/:id", tagController.modifyTag)
      .delete("/tag/:id" , tagController.deleteTag);

export default router;