"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const PostController = {
    getAllPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield prisma.post.findMany({
                include: {
                    User: {
                        select: { name: true, email: true }
                    }
                }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }),
    getOnePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield prisma.post.findUnique({
                where: { id: Number(id) },
                include: { User: true }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }),
    creatPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, content, userId } = req.body;
            if (!title || !content || !userId) {
                return res.status(400).send('Les champs title, content et userId sont requis.');
            }
            const result = yield prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: Number(userId)
                }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send('Erreur du serveur');
        }
    }),
    modifyPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { content, title } = req.body;
            const result = yield prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title: title,
                    content: content
                }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield prisma.post.delete({
                where: { id: Number(id) }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }),
};
exports.default = PostController;
