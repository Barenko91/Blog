"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 3600 });
const checkCache = (req, res, next) => {
    const { id } = req.params;
    if (id) {
        const cacheData = cache.get(id);
        if (cacheData) {
            return res.json(cacheData);
        }
    }
    next();
};
