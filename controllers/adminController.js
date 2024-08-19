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
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("../utils/zod"));
const prisma = new client_1.PrismaClient();
const saltRounds = Number(process.env.SALT);
const adminController = {
    renderAdminPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!req.params) {
                const error = new Error();
                error.detail = 'req.params manquant';
                error.status = 401;
            }
            try {
                const userData = prisma.user.findFirst({
                    where: {
                        id: Number(id)
                    }
                });
                res.status(200).json(userData);
            }
            catch (err) {
                const error = new Error();
                error.details = 'Utilisateur non trouvé.';
                error.status = 500;
            }
        });
    },
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, lastName, firstName } = req.body;
            if (!name || !email || !password) {
                const error = new Error();
                error.details = 'les champs obligatoire sont manquuant (pseudo,email et password).';
                error.status = 401;
            }
            zod_1.default.User.parse({ name, email, firstName, lastName, password });
            const hashPassword = yield bcrypt_1.default.hash(password, saltRounds);
            try {
                const result = yield prisma.user.create({
                    data: {
                        name,
                        email,
                        firstName,
                        lastName,
                        password: hashPassword,
                        admin: true
                    }
                });
                return res.status(200).json(result);
            }
            catch (err) {
                const error = new Error();
                error.details = 'Création annulé une erreur est apparue.';
                error.status = 500;
            }
        });
    },
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!req.params) {
                const error = new Error();
                error.details = 'req.params manquant.';
                error.status = 401;
            }
            try {
                prisma.user.delete({
                    where: {
                        id: Number(id)
                    }
                });
            }
            catch (err) {
                const error = new Error();
                error.details = 'Suppression annulé une erreur est survenue.';
                error.status = 500;
            }
        });
    }
};
exports.default = adminController;
