import * as mongoose from 'mongoose'
import { bookSchema } from './book'
import { chatSchema } from '../../../chat/models/chat'

interface auctionType extends mongoose.Document {
  created: Date,
  threshold: Number,
  currentPrice: Number,
  isActive: Boolean,
  book: Object,
  chat: Object,
}

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
  chat: {
    required: false,
    type: chatSchema
  }
})

const AuctionModel = mongoose.model<auctionType>('Auction', auctionSchema, 'Autction')
export { auctionSchema, AuctionModel }