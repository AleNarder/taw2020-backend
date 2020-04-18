import * as mongoose from 'mongoose'
import auctionSchema from './auction'
import bookSchema from './book'

export default new mongoose.Schema({

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

  address: {
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
  auctions: [auctionSchema]
})

