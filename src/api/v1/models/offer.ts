import * as mongoose from 'mongoose'

interface OfferPayload {
  offerentId: string,
  offerentUs: string,
  receiverId: string,
  auctionId: string,
  amount: number,
  delta: number
}

interface OfferType extends mongoose.Document {
  user: string,
  username: string,
  amount: number,
  delta: number,
  timestamp: number
}

const OfferSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  delta: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
})

const offerModel = mongoose.model<OfferType>('Offer', OfferSchema)

export { offerModel, OfferSchema, OfferType, OfferPayload }