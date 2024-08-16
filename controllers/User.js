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
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = Number(process.env.SALT);
const prisma = new client_1.PrismaClient();
const UsersController = {
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield prisma.user.findMany({
                include: { Post: true, Profile: true }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }),
    getOneUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield prisma.user.findUnique({
                where: { id: Number(id) },
                include: { Post: true, Profile: true }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }),
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, firstName, lastName, password } = req.body;
        zod_1.default.User.parse({ name, email, firstName, lastName, password });
        const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
        if (!name || !email || !password) {
            return res.status(400).send("Merci de renseigner tous les champs.");
        }
        try {
            const result = yield prisma.user.create({
                data: {
                    name,
                    email,
                    firstName,
                    lastName,
                    password: hashPassword
                }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send('Une erreur est apparue durant la création de votre profil');
        }
    }),
    modifyUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, email, firstName, lastName, password } = req.body;
        zod_1.default.User.parse({ name, email, firstName, lastName, password });
        const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
        if (!name || !email || !password) {
            return res.status(400).send("Vous n'avez rien modifier si vous voulez modifier un champs veuiller le remplir avec la nouvelle données Merci");
        }
        try {
            const result = yield prisma.user.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name,
                    email,
                    firstName,
                    lastName,
                    password: hashPassword
                }
            });
            res.json(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send("Une erreur est survenue ! ");
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const result = yield prisma.user.delete({
                where: {
                    id: Number(id)
                }
            });
            res.json(result);
            console.log("Supression réussi");
        }
        catch (error) {
            console.error(error);
            return res.status(500).send("Une erreur est survenue veuillez reéssayer");
        }
    })
};
exports.default = UsersController;
