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
const tagcontrollers = {
    getOneTag: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        if (!req.params) {
            return res.status(400).send("Une erreur est survenue.");
        }
        try {
            const result = yield prisma.tag.findUnique({
                where: { id: Number(id) }
            });
            return res.json(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send("Une erreur est survenue.");
        }
    }),
    getAllTags: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield prisma.tag.findMany();
            return res.json(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send('Une erreur est survenue');
        }
    }),
    createTag: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        zod_1.default.Tag.parse(name);
        if (!name) {
            return res.status(400).send('Veuiller donnnées un nom à votre tag');
        }
        try {
            const result = yield prisma.tag.create({
                data: { name: name }
            });
            return res.json(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send("Une erreur est survenue.");
        }
    }),
    modifyTag: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        zod_1.default.Tag.parse(name);
        const { id } = req.params;
        if (!name) {
            return res.status(400).send("Aucune modificaiton détecté.");
        }
        try {
            const result = yield prisma.tag.update({
                where: { id: Number(id) },
                data: { name: name }
            });
            return res.json(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send("Une erreur est survenue.");
        }
    }),
    deleteTag: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const result = yield prisma.tag.delete({
                where: {
                    id: Number(id)
                }
            });
            return res.json(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send('Une erreur est survenue.');
        }
    })
};
exports.default = tagcontrollers;
