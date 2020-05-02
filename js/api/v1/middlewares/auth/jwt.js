"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../../models/user");
const passport = require("passport");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ENCRYPTION
};
function enableJWTauth() {
    passport.use(new passport_jwt_1.Strategy(options, function (payload, done) {
        user_1.UserModel.findById(payload.id, (err, res) => done(err, { res }));
    }));
}
exports.enableJWTauth = enableJWTauth;
const JWTauth = passport.authenticate('jwt', { session: false });
exports.JWTauth = JWTauth;
//# sourceMappingURL=jwt.js.map