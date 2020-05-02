"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const book_1 = require("./book");
const message_1 = require("./message");
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
    chat: [message_1.messageSchema]
});
exports.auctionSchema = auctionSchema;
const AuctionModel = mongoose.model('Auction', auctionSchema, 'Autction');
exports.AuctionModel = AuctionModel;
//# sourceMappingURL=auction.js.map