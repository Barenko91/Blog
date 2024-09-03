"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const adminChecker = function (req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const secret = process.env.TOKEN_SECRET;
    if (!token) {
        const error = new Error();
        error.details = 'Accès non autorisé';
        error.status = 401;
        return next(error);
    }
    if (!secret) {
        const error = new Error();
        error.details = 'Secret non atteignable.';
        error.status = 500;
        return next(error);
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decodedToken !== 'string' && decodedToken.admin === false) {
            const error = new Error();
            error.details = 'Accés interdit';
            error.status = 403;
            return next(error);
        }
        next();
    }
    catch (err) {
        const error = new Error();
        error.details = 'Token invalide';
        error.status = 401;
        next(error);
    }
};
exports.default = adminChecker;
