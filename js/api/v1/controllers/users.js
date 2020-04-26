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
                const users = yield user_1.UserModel.find().exec();
                res.send(users);
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
                const user = new user_1.UserModel(req.body);
                try {
                    yield user.save();
                    res.send(true);
                }
                catch (e) {
                    console.log(e);
                    res.send(false);
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
        }
    }
};
