import * as mongoose from 'mongoose'
import auctionSchema from './auction'
import userSchema from './user'


export default new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  public: {
    type: Boolean, 
    required: true
  },
  to: [userSchema],
  from: [userSchema],
  auction: [auctionSchema]
})