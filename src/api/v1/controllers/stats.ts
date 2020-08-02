import { AuctionModel } from './../models/auction'
import { UserModel } from '../models/user'
import ErrorHandler from '../../../helpers/ErrorHandler'

export default {
  GET: {
    moderator: async function (req, res, next) {
      try {
        const usersAuctions = <any> await UserModel.find().select('auctions')
        let successful, unSuccessful, active
        successful = unSuccessful = active = 0
        if (usersAuctions) {
          for (let userAuctions of usersAuctions) {
            for (let userAuction of userAuctions.auctions) {
              if (userAuction.isActive) {
                active++
              } else {
                if (userAuction.winner) {
                  successful++
                } else {
                  unSuccessful++
                }
              }
            }
          }
          console.log(successful, unSuccessful, active)
          req.payload = { 
            successful: successful, unSuccessful, active }
          next()
        } else next(new ErrorHandler(500, 'Impossibile accedere alle inserzioni'))
      } catch (e) {
        next(e)
      }
    },
    student: async function (req, res, next) {
      try {
        const { userId } = req.params
        let auctionsWithUser, auctionsWithUserWinner 
        auctionsWithUser = []
        auctionsWithUserWinner = []
        const userAuctions = (<any> await UserModel.findById(userId).select('auctions.book auctions.created auctions._id')).auctions
        const users  = <any> await UserModel.find().select('auctions.offers auctions.book auctions.created _id auctions._id auctions.winner')
        for (let user of users ) {
          for (let auction of user.auctions) {
            if (auction.offers.find(offer => offer.user == userId)) {
              auctionsWithUser.push({
                _id: auction._id,
                book: auction.book,
                created: auction.created
              })
              if (auction.winner == userId) {
                auctionsWithUserWinner.push({
                  _id: auction._id
                })
              }
            }
          }
        }
        req.payload = {
          userAuctions, auctionsWithUser,auctionsWithUserWinner
        }
        next()
      } catch (e) {
        next(e)
      }
    }
  }
}