"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const book_1 = require("./book");
const chat_1 = require("./chat");
const offer_1 = require("./offer");
const auctionSchema = new mongoose.Schema({
    expires: {
        type: Number,
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
    offers: [offer_1.OfferSchema],
    winner: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null,
    },
    chats: {
        required: true,
        type: [chat_1.ChatSchema]
    }
});
exports.auctionSchema = auctionSchema;
const AuctionModel = mongoose.model('Auction', auctionSchema);
exports.AuctionModel = AuctionModel;
//# sourceMappingURL=auction.js.map