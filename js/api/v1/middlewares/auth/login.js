"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_local_1 = require("passport-local");
const user_1 = require("../../models/user");
function enableLoginAuth() {
    passport.use(new passport_local_1.Strategy(function (email, password, done) {
        user_1.UserModel.findOne({
            email,
            password
        }, function (err, res) {
            if (!err) {
                if (res) {
                    return done(null, { res });
                }
                else {
                    return done({
                        code: 400,
                        msg: 'Password o username errati'
                    }, null);
                }
            }
            else {
                return done({
                    code: 500,
                    msg: 'Impossibile trovare alcun utente'
                }, null);
            }
        });
    }));
}
exports.enableLoginAuth = enableLoginAuth;
//# sourceMappingURL=login.js.map