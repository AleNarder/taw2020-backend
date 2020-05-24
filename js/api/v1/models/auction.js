"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const book_1 = require("./book");
const chat_1 = require("../../../chat/models/chat");
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
    book: [book_1.bookSchema],
    chat: {
        required: false,
        type: chat_1.chatSchema
    }
});
exports.auctionSchema = auctionSchema;
const AuctionModel = mongoose.model('Auction', auctionSchema, 'Autction');
exports.AuctionModel = AuctionModel;
//# sourceMappingURL=auction.js.map