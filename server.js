"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const router_1 = __importDefault(require("./router"));
const error_1 = __importDefault(require("./middleware/error"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const cookiesSecret = process.env.SECRET_COOKIES_KEY;
const corsOptions = {
    origin: 'http://localhost:4000/',
    optionsSuccessStatus: 200
};
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(cookiesSecret));
app.use(express_1.default.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
    app.use((0, cors_1.default)(corsOptions));
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        hsts: false
    }));
}
else {
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
}
app.use((req, res, next) => {
    logger_1.default.info('Corps de la requête:', req.body);
    logger_1.default.info('En-têtes de la requête:', req.headers);
    next();
});
app.use(router_1.default);
app.use(error_1.default);
app.listen(PORT, () => {
    logger_1.default.info(`app is running on http://localhost:${PORT}`);
});
