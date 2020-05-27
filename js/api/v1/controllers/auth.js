"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const EmailSender_1 = require("../../../email/EmailSender");
const ErrorHandler_1 = require("../../../helpers/ErrorHandler");
exports.default = {
    POST: {
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        login: function (req, res, next) {
            passport.authenticate('local', { session: false }, (err, user) => {
                if (err) {
                    next(new ErrorHandler_1.default(err.code, err.msg));
                }
                else {
                    console.log(user);
                    if (user.res.confirmed) {
                        req.payload = {
                            token: jwt.sign({ id: user.res._id }, process.env.JWT_ENCRYPTION, {
                                expiresIn: '1h'
                            }),
                            user: user.res
                        };
                        next();
                    }
                    else {
                        next(new ErrorHandler_1.default(400, 'Utente non confermato: controllata la tua casella email'));
                    }
                }
            })(req, res, next);
        },
        moderator: function (req, res, next) {
            const baselink = `${process.env.CLIENT_BASE_URL}/register?moderator=true`;
            const token = jwt.sign(req.body.moderator, process.env.JWT_ENCRYPTION, {
                expiresIn: '1h'
            });
            const link = [baselink, token].join("?tkn=");
            EmailSender_1.default.sendEmail("new-moderator", req.body.email, link, req.body.moderator);
        },
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        logout: function (req, res, next) {
        },
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        reset: function (req, res, next) {
            const user = user_1.UserModel.findOne({ email: req.body.email }, function (err, usr) {
                const baseLink = `${process.env.CLIENT_BASE_URL}/resetpassword?usr=${usr._id}`;
                const token = jwt.sign({ id: res._id }, process.env.JWT_ENCRYPTION, {
                    expiresIn: '1h'
                });
                const link = [baseLink, token].join('&tkn=');
                EmailSender_1.default.sendEmail('reset-password', req.body.email, link)
                    .then((value) => {
                    console.log('[RESET]: Mail inviata');
                    next();
                })
                    .catch((error) => {
                    console.log('[RESET]: Mail non inviata');
                    next(error);
                });
            });
        }
    }
};
//# sourceMappingURL=auth.js.map