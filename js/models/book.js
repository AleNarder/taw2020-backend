"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("./user");
exports.default = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    owner: [user_1.default]
});
