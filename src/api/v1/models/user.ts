import * as mongoose from 'mongoose'
import { auctionSchema, AuctionType } from "./auction";
import { LocationType, locationSchema } from './location';

interface userType extends mongoose.Document {
  firstname: string,
  lastaname: string,
  username: string,
  password: string,
  email: string,
  location: LocationType
  moderator: boolean,
  confirmed: boolean,
  auctions: AuctionType[]
}


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
  moderator: {
    type: Boolean,
    required: true
  },

  confirmed: {
    type: Boolean,
    required: false,
    default: false
  },
  location: [locationSchema],
  auctions: [auctionSchema]
})

const UserModel = mongoose.model<userType>('User', userSchema, 'Users')

export {userSchema, UserModel, userType}