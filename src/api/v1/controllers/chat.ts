import { MessagePayload, messageModel, MessageSchema } from "../models/message";
import { UserModel } from "../models/user";
import { ChatModel } from "../models/chat";
import * as io from 'socket.io'

export default {
  async newMessage (scope: 'public' | 'private', payload: MessagePayload, timestamp) {
    try {
      const usr =  await UserModel.findOne({'auctions._id': payload.auctionId})
      const auction = usr.auctions.find((auction) => auction._id == payload.auctionId)
      let chat = null
      const { senderId, senderUs, message } = payload
      const message2push = await messageModel.create({
        senderId, 
        senderUs,
        message,
        timestamp
      })
      if (scope === 'public') {
        chat = auction.chats.find(chat => chat.scope === scope)
        chat.messages.push(message2push)
      } else {
        let partner = (payload.senderId == usr._id) ? payload.receiverId : payload.senderId
        chat = auction.chats.filter(chat => chat.scope === scope)
        .find(chat => chat.partnerId == partner)
        if (!chat) {
          chat = await ChatModel.create({
            scope: 'private',
            partnerId: payload.senderId,
            partnerUs: payload.senderUs,
          })
          auction.chats.push(chat)
          auction.chats[auction.chats.length - 1].messages.push(message2push)
        } else {
          chat.messages.push(message2push)
        }
      }
      console.log(chat)
      await usr.save()
    } catch (e) {
      console.error(e)
    }
  }
}