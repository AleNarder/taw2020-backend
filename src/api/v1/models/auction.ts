import * as mongoose from 'mongoose'
import bookSchema from './book'
import userSchema from './user'

const auctionSchema = new mongoose.Schema({
  created: {
    type: Date,
    required: true
  },
  threshold: {
    type: Number,
    required: false,
    default: 0
  },
  currentPrice: {
    type: Number,
    required: false,
    default: 0
  },
  isActive: {
    type: Boolean,
    required: true
  },
  buyer: [userSchema],
  seller: [userSchema],
  book: [bookSchema]
})

mongoose.model('Auction', auctionSchema, 'Autction')
export default auctionSchema