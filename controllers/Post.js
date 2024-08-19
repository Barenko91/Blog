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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("../utils/zod"));
const prisma = new client_1.PrismaClient();
const PostController = {
    getAllPosts: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield prisma.post.findMany({
                include: {
                    User: {
                        select: { name: true, email: true }
                    }
                }
            });
            return res.status(200).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = "les post n'ont pas été trouvé.";
            error.status = 500;
        }
    }),
    getOnePost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield prisma.post.findUnique({
                where: { id: Number(id) },
                include: { User: true }
            });
            res.status(200).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = "Le post n'a pas été trouvé.";
            error.status = 500;
        }
    }),
    creatPost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const { title, content } = req.body;
            zod_1.default.Post.parse({ title, content });
            if (!title || !content) {
                const error = new Error();
                error.details = 'titre ou content manquant';
                error.status = 400;
            }
            const result = yield prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: Number(id)
                }
            });
            return res.status(200).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = "Création annulé";
            error.status = 500;
        }
    }),
    modifyPost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!req.params) {
                const error = new Error();
                error.details = 'req.params manquant';
                error.status = 400;
            }
            const { content, title } = req.body;
            if (!title || !content) {
                const error = new Error();
                error.details = 'titre ou content manquant';
                error.status = 400;
            }
            const result = yield prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title: title,
                    content: content
                }
            });
            return res.status(200).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = "Modification annulé";
            error.status = 500;
        }
    }),
    deletePost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!req.params) {
                const error = new Error();
                error.details = 'req.params manquant';
                error.status = 400;
            }
            const result = yield prisma.post.delete({
                where: { id: Number(id) }
            });
            return res.status(200).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = "Suppression annulé";
            error.status = 500;
        }
    }),
};
exports.default = PostController;
