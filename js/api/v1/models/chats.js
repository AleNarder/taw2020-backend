"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const auction_1 = require("./auction");
const message_1 = require("./message");
const chatSchema = new mongoose.Schema({
    public: {
        type: Boolean,
        required: true
    },
    auction: [auction_1.default],
    messages: [message_1.default]
});
mongoose.model('Chat', chatSchema, 'Chats');
exports.default = chatSchema;
