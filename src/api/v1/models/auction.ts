import * as mongoose from 'mongoose'

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
  }
})

mongoose.model('Auction', auctionSchema, 'Autction')
export default auctionSchema