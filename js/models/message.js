"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const auction_1 = require("./auction");
const user_1 = require("./user");
exports.default = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        required: true
    },
    to: [user_1.default],
    from: [user_1.default],
    auction: [auction_1.default]
});
