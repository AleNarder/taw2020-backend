"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../models/user");
const ErrorHandler_1 = require("../../../helpers/ErrorHandler");
const EmailSender_1 = require("../../../email/EmailSender");
const jwt = require("jsonwebtoken");
exports.default = {
    GET: {
        /**
         * Get the whole list of users
         * Used by admin
         * @param req request
         * @param res response
         * @param next next function to execute in the pipeline
         */
        users: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    user_1.UserModel.find((err, res) => {
                        if (!err) {
                            req.payload = res;
                            next();
                        }
                        else {
                            throw new ErrorHandler_1.default(500, 'Collection not reachable');
                        }
                    });
                }
                catch (e) {
                    next(e);
                }
            });
        },
        /**
         * Get single user info
         * Used by admin
         * @param req request
         * @param res response
         * @param next next function to execute in the pipeline
         */
        user: function (req, res, next) {
            try {
                user_1.UserModel.findById(req.params.userId, (err, res) => {
                    if (!err) {
                        req.payload = res;
                        next();
                    }
                    else {
                        throw new ErrorHandler_1.default(500, 'Collection not reachable');
                    }
                });
            }
            catch (e) {
                next(e);
            }
        }
    },
    POST: {
        /**
         * Create a new user
         * Used in signIn
         * @param req request
         * @param res response
         * @param next next function to execute in the pipeline
         */
        user: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const options = {
                        provider: 'locationiq',
                        apiKey: process.env.GEOCODER_API_KEY
                    };
                    user_1.UserModel.findOne({ email: req.body.email }, function (err, usr) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (!usr) {
                                const user = new user_1.UserModel(req.body);
                                user.save(null, (err, res) => {
                                    if (!err) {
                                        const baseLink = `${process.env.CLIENT_BASE_URL}/login?id=${res._id}`;
                                        const token = jwt.sign({ id: res._id }, process.env.JWT_ENCRYPTION, {
                                            expiresIn: '1h'
                                        });
                                        const link = [baseLink, token].join('&tkn=');
                                        EmailSender_1.default.sendEmail("confirm-user", req.body.email, link)
                                            .then((value) => {
                                            console.log('[NEW USER]: email inviata');
                                            next();
                                        })
                                            .catch((error) => {
                                            console.log('[NEW USER]: email non inviata');
                                            next(error);
                                        });
                                    }
                                    else {
                                        next(new ErrorHandler_1.default(500, 'Utente non salvato'));
                                    }
                                });
                            }
                            else {
                                next(new ErrorHandler_1.default(400, 'Utente già esistente'));
                            }
                        });
                    });
                }
                catch (e) {
                    next(e);
                }
            });
        }
    },
    PUT: {
        /**
         * Modify user info or role
         * Used by admin (when promoting user) or by user for itself
         * @param req request
         * @param res response
         * @param next next function to execute in the pipeline
         */
        userProperty: function (req, res, next) {
            try {
                user_1.UserModel.findByIdAndUpdate(req.params.userId, req.body, (err, res) => {
                    if (!err) {
                        req.payload = res;
                    }
                    else {
                        throw new ErrorHandler_1.default(500, 'Utente non aggiornato');
                    }
                });
                next();
            }
            catch (e) {
                next(e);
            }
        }
    },
    DELETE: {
        /**
         * Delete user
         * Used by user
         * @param req request
         * @param res response
         * @param next next function to execute in the pipeline
         */
        user: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    user_1.UserModel.findByIdAndDelete(req.params.userId, (err, res) => {
                        if (!err) {
                            req.payload = res;
                            next();
                        }
                        else {
                            next(new ErrorHandler_1.default(500, 'User not deleted'));
                        }
                    });
                }
                catch (e) {
                }
            });
        }
    }
};
//# sourceMappingURL=users.js.map