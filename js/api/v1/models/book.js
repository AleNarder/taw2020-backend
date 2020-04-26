"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
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
    }
});
mongoose.model('Book', bookSchema, 'Books');
exports.default = bookSchema;
