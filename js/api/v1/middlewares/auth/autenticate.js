"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const ErrorHandler_1 = require("../../../../helpers/ErrorHandler");
function default_1(req, res, next) {
    passport.authenticate('jwt', (err, user, info) => {
        if (err)
            throw new Error();
        if (!user)
            throw new ErrorHandler_1.default(401, 'User not authorized');
        req.user = user;
        next();
    });
}
exports.default = default_1;
