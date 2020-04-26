"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const auction_1 = require("./auction");
const user_1 = require("./user");
const chatSchema = new mongoose.Schema({
    public: {
        type: Boolean,
        required: true
    },
    auction: [auction_1.default],
    sender: [user_1.default]
});
mongoose.model('Chat', chatSchema, 'Chats');
exports.default = chatSchema;
