"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
function errorHandler(err, req, res, next) {
    logger_1.default.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Une erreur est survenue",
        details: err.details || null,
    });
}
exports.default = errorHandler;
