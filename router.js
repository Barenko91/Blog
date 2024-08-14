"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("./controllers/User"));
const Post_1 = __importDefault(require("./controllers/Post"));
const router = (0, express_1.Router)();
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get("/", Post_1.default.getAllPosts);
router.get("/post/:id", Post_1.default.getOnePost);
router.post("/post", Post_1.default.creatPost)
    .put("/post/:id", Post_1.default.modifyPost)
    .delete("/post/:id", Post_1.default.deletePost);
router.get("/users", User_1.default.getAllUsers);
router.get("/users/:id", User_1.default.getOneUser);
router.post("/user", User_1.default.createUser)
    .put("/user/:id", User_1.default.modifyUser)
    .delete("/user/:id", User_1.default.deleteUser);
exports.default = router;
