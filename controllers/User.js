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
const error = new Error();
const UsersController = {
    getAllUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield prisma.user.findMany({
                include: { Post: true, Profile: true }
            });
            return res.status(220).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = "Aucun utilisateur présent en BDD.";
            error.status = 500;
            return next(error);
        }
    }),
    getOneUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield prisma.user.findUnique({
                where: { id: Number(id) },
                include: { Post: true, Profile: true }
            });
            return res.status(220).json(result);
            ;
        }
        catch (err) {
            const error = new Error();
            error.details = "Utilisateur inconnue.";
            error.status = 500;
            return next(error);
        }
    }),
    createUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, firstName, lastName, password } = req.body;
        zod_1.default.User.parse({ name, email, firstName, lastName, password });
        const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
        if (!name || !email || !password) {
            const error = new Error();
            error.details = 'les champs email, name ou password sont manquant.';
            error.status = 400;
            return next(error);
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
            return res.status(220).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = 'Création non effectué';
            error.status = 500;
            return next(error);
        }
    }),
    modifyUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, email, firstName, lastName, password } = req.body;
        zod_1.default.User.parse({ name, email, firstName, lastName, password });
        const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
        if (!name || !email || !password) {
            const error = new Error();
            error.details = 'Des champs obligatoire sont manquant.';
            error.status = 400;
            return next(error);
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
            return res.status(220).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = 'modification non effectué';
            error.status = 500;
            return next(error);
        }
    }),
    deleteUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const result = yield prisma.user.delete({
                where: {
                    id: Number(id)
                }
            });
            return res.status(220).json(result);
        }
        catch (err) {
            const error = new Error();
            error.details = 'Suppression non effectué';
            error.status = 500;
            return next(error);
        }
    }),
};
exports.default = UsersController;
