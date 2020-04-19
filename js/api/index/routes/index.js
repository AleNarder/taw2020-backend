"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const status_1 = require("../controllers/status");
const router = express.Router();
router
    .route('/')
    .get(status_1.default.GET.status);
exports.default = router;
