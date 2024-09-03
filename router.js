"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("./controllers/User"));
const Post_1 = __importDefault(require("./controllers/Post"));
const Tag_1 = __importDefault(require("./controllers/Tag"));
const isAuthed_1 = __importDefault(require("./controllers/isAuthed"));
const homeController_1 = __importDefault(require("./controllers/homeController"));
const adminController_1 = __importDefault(require("./controllers/adminController"));
const httpLogs_1 = require("./middleware/httpLogs");
const router = (0, express_1.Router)();
router.post("/login", isAuthed_1.default.login)
    .get("/", homeController_1.default.renderHomePage);
// router.use(authenticateToken);
router.get('/logout', isAuthed_1.default.logout);
router.get("/post", Post_1.default.getAllPosts)
    .get("/post/:id", Post_1.default.getOnePost)
    .post("/post", Post_1.default.creatPost)
    .put("/post/:id", Post_1.default.modifyPost)
    .delete("/post/:id", Post_1.default.deletePost);
router.get("/users", User_1.default.getAllUsers)
    .get("/users/:id", User_1.default.getOneUser)
    .post("/user", User_1.default.createUser)
    .put("/user/:id", User_1.default.modifyUser)
    .delete("/user/:id", User_1.default.deleteUser);
router.get("/tags", Tag_1.default.getAllTags)
    .get("/tag/:id", Tag_1.default.getOneTag)
    .post("/tag", Tag_1.default.createTag)
    .put("/tag/:id", Tag_1.default.modifyTag)
    .delete("/tag/:id", Tag_1.default.deleteTag);
// router.use(adminChecker)
router.get("/admin/id", adminController_1.default.renderAdminPage)
    .get('/admin/stats', httpLogs_1.getHttpStats)
    .post("/admin", adminController_1.default.createAdmin)
    .delete("/admin/:id", adminController_1.default.deleteAdmin);
exports.default = router;
