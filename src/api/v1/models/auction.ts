import * as mongoose from 'mongoose'
import { bookSchema, BookType } from './book'
import { ChatSchema, ChatType } from './chat'
import { OfferSchema } from './offer'

interface AuctionType extends mongoose.Document {
  expires: Number,
  threshold: Number,
  currentPrice: Number,
  isActive: Boolean,
  book: BookType[]
  chats: ChatType[]
}

const auctionSchema = new mongoose.Schema({
  expires: {
    type: Number,
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
  offers: [OfferSchema],
  winner: {
    type: mongoose.Types.ObjectId,
    required: false,
    default: null,
  },
  chats: {
    required: true,
    type: [ChatSchema]
  }
})

const AuctionModel = mongoose.model<AuctionType>('Auction', auctionSchema)
export { auctionSchema, AuctionModel, AuctionType }