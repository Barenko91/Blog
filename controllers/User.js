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
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).send("le nom et l'email sont obligatoire ! ");
        }
        try {
            const result = yield prisma.user.create({
                data: {
                    name: name,
                    email: email
                }
            });
            res.json(result);
            console.log(result);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send('Une erreur est apparue durant la création de votre profile');
        }
    }),
    modifyUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, email } = req.body;
        console.log(req.body);
        if (!name || !email) {
            return res.status(400).send("Vous n'avez rien modifier si vous voulez modifier un champs veuiller le remplir avec la nouvelle données Merci");
        }
        try {
            const result = yield prisma.user.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: name,
                    email: email
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
