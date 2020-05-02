"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const auction_1 = require("./auction");
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
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    moderator: {
        type: Boolean,
        required: true
    },
    auctions: [auction_1.auctionSchema]
});
exports.userSchema = userSchema;
const UserModel = mongoose.model('User', userSchema, 'Users');
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map