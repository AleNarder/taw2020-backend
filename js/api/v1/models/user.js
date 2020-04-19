"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const auction_1 = require("./auction");
const book_1 = require("./book");
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        }
    },
    moderator: {
        type: Boolean,
        required: true
    },
    books: [book_1.default],
    auctions: [auction_1.default]
});
mongoose.model('User', userSchema, 'Users');
exports.default = userSchema;
