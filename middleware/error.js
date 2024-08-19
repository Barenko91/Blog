"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Une erreur est survenue",
        details: err.details || null,
    });
}
exports.default = errorHandler;
