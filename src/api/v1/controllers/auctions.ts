import { AuctionModel } from './../models/auction'
import { UserModel} from '../models/user'
import ErrorHandler from '../../../helpers/ErrorHandler'

export default {
  POST: {
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    auction: function (req, res, next) {
      try {
        const user = req.body.id
        const auction = new AuctionModel(req.body.auction)
        UserModel.findByIdAndUpdate(user, {$push: {auctions: auction}}, (err, res) => {
          if (!err){
            req.payload = res
            next()
          } else throw new ErrorHandler(500, 'Auction not created')
        })
      } catch (e) {
        next(e)
      }
    }
  },
  GET: {
    /**
     * 
     * @param req 
     * @param res
     * @param next 
     */
    auctions: async function (req, res, next) {
      try {
        const auctions = await UserModel.find().select('auctions')
        if (auctions) {
          req.payload = auctions
          next()
        } else throw new ErrorHandler(500, 'Cannot get any auction')
      } catch (e) {
        next(e)
      }
    },
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    auction: async function (req, res, next) {
      try {
        const {userId, auctionId} = req.params
        const user = await UserModel.findById(userId)
        if (user) {
          req.payload = user.auctions.id(auctionId)
          next()
        } else throw new ErrorHandler(500, 'Cannot get the auction')
      } catch (e) {
        next(e)
      }
    }
  },
  PUT: {
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    auctionProperty: async function (req, res, next) {
      try {
        const {userId, auctionId} = req.params
        const { payload } = req.body
        const user = await UserModel.findById(userId)
        const auction = user.auctions.id(auctionId)
        for (let key in payload) {
          auction[key] = payload[key]
        }
        user.save((err, res)=> {
          if (!err) {
            req.payload = res
            next()
          } else throw new ErrorHandler(500, 'Auction not updated')
        })
      } catch (e) {
        next(e)
      }
    }
  },
  DELETE: {
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    auction: async function (req, res, next) {
      try {
        const {userId, auctionId} = req.params
        const user = await UserModel.findById(userId)
        const auction = user.auctions.id(auctionId)
        auction.isActive = false
        user.save((err, res)=> {
          if (!err) {
            req.payload = res
            next()
          } else throw new ErrorHandler(500, 'Auction not deleted')
        })
      } catch (e) {
        next(e)
      }
    }
  },
}