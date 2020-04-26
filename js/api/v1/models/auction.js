"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
    }
});
mongoose.model('Auction', auctionSchema, 'Autction');
exports.default = auctionSchema;
