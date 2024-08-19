"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setAuthCookies;
function setAuthCookies(res, user) {
    const cookieOptions = {
        domain: 'localhost',
        path: '/',
        secure: false,
        signed: true,
        maxAge: 12 * 60 * 60 * 1000
    };
    res.cookie('userEmail', user.email, cookieOptions);
    res.cookie('userId', user.id, cookieOptions);
}
