"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const router_1 = __importDefault(require("./router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT || 3000;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((req, res, next) => {
    console.log('Corps de la requête:', req.body);
    next();
});
server.use((req, res, next) => {
    console.log('En-têtes de la requête:', req.headers);
    next();
});
server.use(router_1.default);
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
