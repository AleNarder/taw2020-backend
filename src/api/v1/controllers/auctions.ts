import { AuctionModel } from './../models/auction'
import { UserModel } from '../models/user'
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
        const user = req.params.userId
        req.body.auction.created = Date.now()
        req.body.auction.isActive = true
        req.body.auction.winner = null
        req.body.auction.chats = [{
          'scope': 'public'
        }]
        console.log(req.body.auction)
        const auction = new AuctionModel(req.body.auction)
        UserModel.findByIdAndUpdate(user, {$push: {auctions: auction}}, (err, res) => {
          if (!err){
            req.payload = res
            next()  
          } else throw new ErrorHandler(500, 'Inserzione non creata')
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
        const usersAuctions = <any> await UserModel.find().select('auctions')
        if (usersAuctions) {
          for (let userAuctions of usersAuctions) {
            for (let userAuction of userAuctions.auctions) {
              userAuction.usr = userAuctions._id
            }
          }
          req.payload = usersAuctions
          next()
        } else next(new ErrorHandler(500, 'Imposssibile accedere alle inserzioni'))
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
        const user = <any> await UserModel.findById(userId)
        if (user) {
          req.payload = user.auctions.id(auctionId)
          next()
        } else next(new ErrorHandler(500, "Impossibile accedere all'inserzione"))
      } catch (e) {
        next(e)
      }
    },

    userAuctions: async function (req, res, next) {
      try {
        const { userId } = req.params
        const user = <any> await UserModel.findById(userId)
        if (user) {
          req.payload = user.auctions
          next()
        } else next(new ErrorHandler(500, "Impossibile accedere all'inserzione"))
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
        const { userId, auctionId } = req.params
        const { payload } = req.body
        const user = <any> await UserModel.findById(userId)
        const auction = user.auctions.id(auctionId)
        for (let key in payload) {
          auction[key] = payload[key]
        }
        user.save((err, res)=> {
          if (!err) {
            req.payload = res
            next()
          } else next(new ErrorHandler(500, 'Inserzione non aggiornata'))
        })
      } catch (e) {
        next(e)
      }
    },

    auctionOffer: async function (req, res, next) {
      try {
        const { userId, auctionId } = req.params
        const payload = req.body
        const user = <any> await UserModel.findById(userId)
        const offerent = await UserModel.findById(payload.user)
        const auction = user.auctions.id(auctionId)
        if (auction.offers.length === 0 || auction.currentPrice < payload.amount) {
          auction.offers.push({
            user: payload.user,
            username: offerent.username,
            amount: payload.amount,
            timestamp: Date.now(),
            delta: payload.amount - auction.currentPrice
          })
          auction.currentPrice = payload.amount
        } else {
          next(new ErrorHandler(400, 'Offerta troppo bassa'))
        }
        user.save((err, res)=> {
          if (!err) {
            req.payload = res
            next()
          } else {
            console.log(err)
            next(new ErrorHandler(500, 'Offerta non aggiunta'))
          }
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
        const { userId, auctionId } = req.params
        const user = <any> await UserModel.findById(userId)
        const auction = user.auctions.id(auctionId)
        auction.isActive = false
        user.save((err, res)=> {
          if (!err) {
            req.payload = res
            next()
          } else next(new ErrorHandler(500, 'Inserzione non eliminata'))
        })
      } catch (e) {
        next(e)
      }
    }
  },
}