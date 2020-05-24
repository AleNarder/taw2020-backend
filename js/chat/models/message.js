"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        requie: true
    },
    timeStamp: {
        type: Date,
        required: true
    }
});
exports.messageSchema = messageSchema;
const messageModel = mongoose.model('Message', messageSchema);
exports.messageModel = messageModel;
//# sourceMappingURL=message.js.map