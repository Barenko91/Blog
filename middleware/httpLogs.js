"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHttpStats = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const adminStats = {
    Home: 0,
    CreatedAccounts: 0,
    DeletedAccounts: 0
};
const httpLogger = function (req, res, next) {
    logger_1.default.http(`HTTP ${req.method} ${req.url}`);
    switch (req.method) {
        case 'GET':
            if (req.url === '/') {
                adminStats.Home += 1;
            }
            break;
        case 'POST':
            if (req.url === '/user') {
                adminStats.CreatedAccounts += 1;
            }
            break;
        case 'DELETE':
            if (req.url.startsWith('/user/')) {
                adminStats.DeletedAccounts += 1;
            }
            break;
    }
    next();
};
const getHttpStats = (req, res, next) => {
    res.json(adminStats);
};
exports.getHttpStats = getHttpStats;
exports.default = httpLogger;
