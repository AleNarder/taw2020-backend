"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(err, req, res, next) {
    const statusCode = (err.statusCode) ? err.statusCode : 500;
    const message = (err.message) ? err.message : 'Internal server error';
    res.status(statusCode).send({
        status: 'error',
        payload: message
    });
}
exports.default = default_1;
