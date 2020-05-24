"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const message_1 = require("./message");
const chatSchema = new mongoose.Schema({
    public: {
        type: Boolean,
        required: true
    },
    partecipants: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    messages: {
        type: [message_1.messageSchema],
        required: false
    }
});
exports.chatSchema = chatSchema;
const ChatModel = mongoose.model('Chat', chatSchema, 'Chats');
exports.ChatModel = ChatModel;
//# sourceMappingURL=chat.js.map