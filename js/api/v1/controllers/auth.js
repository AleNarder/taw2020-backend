"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const jwt = require("jsonwebtoken");
exports.default = {
    POST: {
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        login: function (req, res, next) {
            try {
                passport.authenticate('local', { session: false }, (err, user) => {
                    if (err) {
                        res.status(err.code).send({
                            status: 'error',
                            payload: err.msg
                        });
                    }
                    else {
                        req.payload = {
                            token: jwt.sign({ id: user.res._id }, process.env.JWT_ENCRYPTION, {
                                expiresIn: '1h'
                            }),
                            user: user.res
                        };
                        next();
                    }
                })(req, res, next);
            }
            catch (e) {
                next(e);
            }
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
        register: function (req, res, next) {
        }
    }
};
//# sourceMappingURL=auth.js.map