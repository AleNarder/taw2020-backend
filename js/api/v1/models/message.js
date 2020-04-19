"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("./user");
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    to: [user_1.default],
    from: [user_1.default],
});
mongoose.model('Message', messageSchema, 'Messages');
exports.default = messageSchema;
