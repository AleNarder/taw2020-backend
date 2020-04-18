"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.use((req, res, next) => {
    next();
});
router.get('/', (req, res, next) => {
    res.end('HELLO');
});
exports.default = router;
