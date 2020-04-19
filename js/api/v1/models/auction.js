"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const book_1 = require("./book");
const user_1 = require("./user");
const auctionSchema = new mongoose.Schema({
    created: {
        type: Date,
        required: true
    },
    threshold: {
        type: Number,
        required: false,
        default: 0
    },
    currentPrice: {
        type: Number,
        required: false,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true
    },
    buyer: [user_1.default],
    seller: [user_1.default],
    book: [book_1.default]
});
mongoose.model('Auction', auctionSchema, 'Autction');
exports.default = auctionSchema;
