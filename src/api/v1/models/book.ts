import * as mongoose from 'mongoose'
import userSchema from './user'

const bookSchema = new mongoose.Schema({
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

mongoose.model('Book', bookSchema, 'Books')
export default bookSchema