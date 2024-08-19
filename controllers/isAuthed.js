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
const zod_2 = require("zod");
const jwtUtils_1 = require("../utils/jwtUtils");
const prisma = new client_1.PrismaClient();
const authController = {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                zod_1.default.Auth.parse({ email, password });
                console.log(email, password);
                const user = yield prisma.user.findFirst({
                    where: {
                        email: email,
                    }
                });
                if (!user) {
                    const error = new Error("Cette utilisateur n'existe pas.");
                    error.details = "Aucun utilisateur trouvé avec cette email.";
                    error.status = 401;
                    return next(error);
                }
                const match = yield bcrypt_1.default.compare(password, user.password);
                if (!match) {
                    const error = new Error("Mot de passe incorect.");
                    error.details = "Mot de passe inconnue.",
                        error.status = 401;
                    return next(error);
                }
                const payload = {
                    userId: user.id,
                    userEmail: user.email,
                    admin: user.admin
                };
                const token = (0, jwtUtils_1.generateToken)(payload);
                return res.status(200).json(token);
            }
            catch (err) {
                if (err instanceof zod_2.ZodError) {
                    const error = new Error("Validation des données échoué");
                    error.details = err.errors;
                    error.status = 400;
                    console.log(error);
                    return next(error);
                }
                const error = new Error("Une erreur est survenue.");
                error.details = "La promesse n'est pas arriver a terme";
                error.status = 500;
                return next(error);
            }
        });
    },
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send('Déconnexion réussie');
        });
    },
};
exports.default = authController;
