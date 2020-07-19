import * as mongoose from 'mongoose'
import { MessageSchema, MessageType } from './message'

interface ChatType extends mongoose.Document {
  scope: 'public' | 'private',
  partnerId: string,
  partnerUsername: string,
  messages: MessageType[]
}


const ChatSchema = new mongoose.Schema({
  scope: {
    required: true,
    type: String
  },
  partnerId: {
    required: false,
    type: mongoose.Types.ObjectId
  },
  partnerUs: {
    required: false,
    type: String
  },
  messages: {
    type: [MessageSchema],
    required: false
  }
})

const ChatModel = mongoose.model<ChatType>('Chat', ChatSchema)

export {ChatSchema, ChatModel, ChatType}