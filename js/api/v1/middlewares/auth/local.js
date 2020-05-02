"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_local_1 = require("passport-local");
const user_1 = require("../../models/user");
const ErrorHandler_1 = require("../../../../helpers/ErrorHandler");
const configuration = passport.use(new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, next) {
    user_1.UserModel.find({
        username,
        password
    }, function (err, res) {
        if (!err) {
            if (res) {
                return res;
            }
            else {
                return new ErrorHandler_1.default(400, 'Incorrect username or password');
            }
        }
        else {
            return new ErrorHandler_1.default(500, 'Cannot find any user');
        }
    });
}));
exports.default = configuration;
