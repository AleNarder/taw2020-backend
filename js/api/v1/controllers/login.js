"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router
    .use((req, res, next) => { next(); });
router
    .route('/')
    .get((req, res, next) => { res.end('OK'); });
router.
    route('login')
    .post();
exports.default = router;
