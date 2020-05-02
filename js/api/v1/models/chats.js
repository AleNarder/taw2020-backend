"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("./user");
const chatSchema = new mongoose.Schema({
    public: {
        type: Boolean,
        required: true
    },
    sender: [user_1.userSchema]
});
mongoose.model('Chat', chatSchema, 'Chats');
exports.default = chatSchema;
