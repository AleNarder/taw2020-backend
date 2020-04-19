import * as mongoose from 'mongoose'
import userSchema from './user'

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  to: [userSchema],
  from: [userSchema],
})

mongoose.model('Message', messageSchema, 'Messages')
export default messageSchema