import * as mongoose from 'mongoose'
import userSchema from './user'

export default new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  owner: [userSchema]
})