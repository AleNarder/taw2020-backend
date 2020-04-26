import * as mongoose from 'mongoose'
import auctionSchema from "./auction";
import userSchema from "./user";

const chatSchema = new mongoose.Schema({
  public: {
    type: Boolean,
    required: true
  },
  auction: [auctionSchema],
  sender: [userSchema]
})

mongoose.model('Chat', chatSchema, 'Chats')
export default chatSchema