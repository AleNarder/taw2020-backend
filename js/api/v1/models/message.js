"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    public: {
        type: Boolean,
        required: true
    }
});
exports.messageSchema = messageSchema;
const MessageModel = mongoose.model('Message', messageSchema);
exports.MessageModel = MessageModel;
//# sourceMappingURL=message.js.map