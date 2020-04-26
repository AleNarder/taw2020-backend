"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
    province: {
        type: String,
        required: true
    },
    cap: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
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
});
exports.userSchema = userSchema;
const UserModel = mongoose.model('User', userSchema, 'Users');
exports.UserModel = UserModel;
