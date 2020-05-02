"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_local_1 = require("passport-local");
const user_1 = require("../../models/user");
function enableLogin() {
    passport.use(new passport_local_1.Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        user_1.UserModel.find({
            username,
            password
        }, function (err, res) {
            if (!err) {
                if (res) {
                    return done(null, { res });
                }
                else {
                    return done({
                        code: 400,
                        msg: 'Incorrect password or username'
                    }, null);
                }
            }
            else {
                return done({
                    code: 500,
                    msg: 'Cannot find any user'
                }, null);
            }
        });
    }));
}
exports.default = enableLogin;
//# sourceMappingURL=login.js.map