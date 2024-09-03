import { Router } from "express";
import UsersController from "./controllers/User";
import PostController from "./controllers/Post";
import tagController from "./controllers/Tag"
import authController from "./controllers/isAuthed";
import homeController from "./controllers/homeController";
import adminChecker from "./middleware/adminChecker";
import adminController from "./controllers/adminController";
import { authenticateToken } from "./utils/jwtUtils";
import { getHttpStats } from "./middleware/httpLogs";
const router = Router();
 
router.post("/login" , authController.login)
      .get("/", homeController.renderHomePage);

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
      .put("/user/:id" , UsersController.modifyUser)
      .delete("/user/:id" , UsersController.deleteUser);

router.get("/tags" , tagController.getAllTags)
      .get("/tag/:id" , tagController.getOneTag)
      .post("/tag" , tagController.createTag)
      .put("/tag/:id", tagController.modifyTag)
      .delete("/tag/:id" , tagController.deleteTag);

// router.use(adminChecker)

router.get("/admin/id", adminController.renderAdminPage)
      .get('/admin/stats',getHttpStats)
      .post("/admin", adminController.createAdmin)
      .delete("/admin/:id", adminController.deleteAdmin)

export default router;