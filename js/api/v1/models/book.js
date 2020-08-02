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
exports.bookSchema = bookSchema;
const BookModel = mongoose.model('Book', bookSchema);
exports.BookModel = BookModel;
//# sourceMappingURL=book.js.map