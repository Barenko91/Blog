"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
function generateToken(data) {
    if (!process.env.TOKEN_SECRET) {
        throw new Error('TOKEN_SECRET is not defined in environment variables');
    }
    return jsonwebtoken_1.default.sign(data, process.env.TOKEN_SECRET, { expiresIn: '15m' });
}
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        console.log("token is null");
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("token failed", err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
