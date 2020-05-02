"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../models/user");
const ErrorHandler_1 = require("../../../helpers/ErrorHandler");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};
const strategy = new passport_jwt_1.Strategy(options, (payload, next) => {
    try {
        const user = user_1.UserModel.findById(payload.id);
        if (user)
            return next(null, user);
        return next(null, null);
    }
    catch (e) {
        console.error(e);
        throw new ErrorHandler_1.default(500, 'Utente inesistente');
    }
});
passport.use(strategy);
const handler = passport.initialize();
exports.default = handler;
