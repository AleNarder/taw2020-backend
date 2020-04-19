"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
