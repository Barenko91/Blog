"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("./controllers/User"));
const Post_1 = __importDefault(require("./controllers/Post"));
const Tag_1 = __importDefault(require("./controllers/Tag"));
const router = (0, express_1.Router)();
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get("/", Post_1.default.getAllPosts)
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
exports.default = router;
