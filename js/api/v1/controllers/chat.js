"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../models/message");
const user_1 = require("../models/user");
const chat_1 = require("../models/chat");
exports.default = {
    newMessage(scope, payload, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usr = yield user_1.UserModel.findOne({ 'auctions._id': payload.auctionId });
                const auction = usr.auctions.find((auction) => auction._id == payload.auctionId);
                let chat = null;
                const { senderId, senderUs, message } = payload;
                const message2push = yield message_1.messageModel.create({
                    senderId,
                    senderUs,
                    message,
                    timestamp
                });
                if (scope === 'public') {
                    chat = auction.chats.find(chat => chat.scope === scope);
                    chat.messages.push(message2push);
                }
                else {
                    let partner = (payload.senderId == usr._id) ? payload.receiverId : payload.senderId;
                    chat = auction.chats.filter(chat => chat.scope === scope).find(chat => chat.partnerId == partner);
                    if (!chat) {
                        chat = yield chat_1.ChatModel.create({
                            scope: 'private',
                            partnerId: payload.senderId,
                            partnerUs: payload.senderUs,
                        });
                        auction.chats.push(chat);
                        auction.chats[auction.chats.length - 1].messages.push(message2push);
                    }
                    else {
                        chat.messages.push(message2push);
                    }
                }
                console.log(chat);
                yield usr.save();
            }
            catch (e) {
                console.error(e);
            }
        });
    }
};
//# sourceMappingURL=chat.js.map