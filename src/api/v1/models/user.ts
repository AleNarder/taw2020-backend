import * as mongoose from 'mongoose'
import { auctionSchema, AuctionType } from "./auction";

interface userType extends mongoose.Document {
  firstname: string,
  lastaname: string,
  username: string,
  password: string,
  email: string,
  address: string,
  state: string,
  zipcode: string,
  country: string,
  location: string,
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
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true 
    } ,
    coordinates: {
      type: [Number],
      required: true
    }
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

  auctions: [auctionSchema]
})

const UserModel = mongoose.model<userType>('User', userSchema, 'Users')

export {userSchema, UserModel}