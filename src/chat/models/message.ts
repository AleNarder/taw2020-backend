import * as mongoose from 'mongoose'

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
})

const messageModel = mongoose.model('Message', messageSchema)

export { messageModel, messageSchema }