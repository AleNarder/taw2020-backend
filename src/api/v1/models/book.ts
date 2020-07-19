import * as mongoose from 'mongoose'

interface BookType extends mongoose.Document {
  title: string,
  author: string,
  course: string,
  university: string
}

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

const BookModel = mongoose.model<BookType>('Book', bookSchema, 'Books')
export { bookSchema, BookModel, BookType }