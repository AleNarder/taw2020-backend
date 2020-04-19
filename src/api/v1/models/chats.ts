import * as mongoose from 'mongoose'
import auctionSchema from './auction'
import messageSchema from './message'

const chatSchema = new mongoose.Schema({
  public: {
    type: Boolean,
    required: true
  },
  auction: [auctionSchema],
  messages: [messageSchema]
})

mongoose.model('Chat', chatSchema, 'Chats')
export default chatSchema