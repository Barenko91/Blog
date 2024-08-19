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
const cache_1 = require("../middleware/cache");
const prisma = new client_1.PrismaClient();
const homeController = {
    renderHomePage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cacheKey = "lastPost";
            const cachedPosts = (0, cache_1.getCache)(cacheKey);
            if (cachedPosts) {
                return res.status(200).json(cachedPosts);
            }
            const lastPosts = yield prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: 10
            });
            (0, cache_1.setCache)(cacheKey, lastPosts, 3600);
            return res.status(200).json(lastPosts);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: error });
        }
    })
};
exports.default = homeController;
