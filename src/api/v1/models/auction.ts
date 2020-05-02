import * as mongoose from 'mongoose'
import { bookSchema } from './book'
import { messageSchema } from './message'


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
  book: [bookSchema],
  chat: [messageSchema]
})

const AuctionModel = mongoose.model('Auction', auctionSchema, 'Autction')
export { auctionSchema, AuctionModel }