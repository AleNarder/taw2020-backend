import * as mongoose from 'mongoose'
import { messageSchema } from './message'

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
    type: [messageSchema],
    required: false
  }
})

const ChatModel = mongoose.model('Chat', chatSchema, 'Chats')

export {chatSchema, ChatModel}