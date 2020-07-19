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
        const userAuctions = (<any> await UserModel.findById(userId)).auctions
        const users  = <any> await UserModel.find()
        for (let user of users ) {
          console.log(user.auctions)
          for (let auction of user.auctions) {
            if (auction.offers.find(offer => offer.user == userId)) {
              auctionsWithUser.push(auction)
              if (auction.winner == userId) {
                auctionsWithUserWinner.push(auction)
              }
            }
          }
        }
        req.payload = {
          userAuctions, auctionsWithUserWinner, auctionsWithUser
        }
        next()
      } catch (e) {
        next(e)
      }
    }
  }
}