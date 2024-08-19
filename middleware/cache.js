"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCache = exports.getCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 3600 }); // Cache avec expiration de 1 heure
const getCache = (key) => {
    return cache.get(key);
};
exports.getCache = getCache;
const setCache = (key, value, ttl) => {
    cache.set(key, value, ttl);
};
exports.setCache = setCache;
