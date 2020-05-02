import * as mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  public: {
    type: Boolean,
    required: true
  }
})

const MessageModel = mongoose.model('Message', messageSchema, )
export {messageSchema, MessageModel }