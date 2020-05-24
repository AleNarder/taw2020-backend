"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../../models/user");
const passport = require("passport");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ENCRYPTION
};
function enableJWTAuth() {
    passport.use(new passport_jwt_1.Strategy(options, function (payload, done) {
        user_1.UserModel.findById(payload.id, function (err, res) {
            if (res) {
                return done(null, true);
            }
            else {
                return done(null, true);
            }
        });
    }));
}
exports.enableJWTAuth = enableJWTAuth;
//# sourceMappingURL=jwt.js.map