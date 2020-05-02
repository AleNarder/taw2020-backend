"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(err, req, res, next) {
    const { statusCode, message } = err;
    res.status(statusCode).send({
        status: 'error',
        payload: message
    });
}
exports.default = default_1;
//# sourceMappingURL=error.js.map