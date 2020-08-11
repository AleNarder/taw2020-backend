"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const auction_1 = require("./auction");
const location_1 = require("./location");
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
    moderator: {
        type: Boolean,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: false,
        default: false
    },
    location: [location_1.locationSchema],
    auctions: [auction_1.auctionSchema]
});
exports.userSchema = userSchema;
const UserModel = mongoose.model('User', userSchema, 'Users');
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map