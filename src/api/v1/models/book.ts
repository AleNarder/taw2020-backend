import * as mongoose from 'mongoose'

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
  }
})

const BookModel = mongoose.model('Book', bookSchema, 'Books')
export { bookSchema, BookModel }