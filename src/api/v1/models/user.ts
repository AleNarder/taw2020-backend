import * as mongoose from 'mongoose'
import bookSchema from './book'

const userSchema = new mongoose.Schema({

  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
    minlength: 8
  },

  email: {
    type: String,
    required: true
  }, 
  province: {
    type: String,
    required: true
  },
  cap: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true 
    }    
  },

  moderator: {
    type: Boolean,
    required: true
  },

  books: [bookSchema],
})

const UserModel = mongoose.model('User', userSchema, 'Users')

export {userSchema, UserModel}