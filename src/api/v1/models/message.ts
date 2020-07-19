import * as mongoose from 'mongoose'

interface MessagePayload {
  senderId: string,
  message: string,
  timestamp: Number,
  auctionId: string,
  receiverId ?: string,
  senderUs: string 
}


interface MessageType extends mongoose.Document {
  senderId: string,
  senderUs: string,
  message: string,
  timestamp: number
}

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  senderUs: {
    type: String,
    required: true
  },
  message: {
    type: String,
    requie: true
  },
  timestamp: {
    type: Number,
    required: true
  }
})

const messageModel = mongoose.model<MessageType>('Message', MessageSchema)

export { messageModel, MessageSchema, MessageType, MessagePayload }