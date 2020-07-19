import { UserModel } from '../api/v1/models/user'

export default async function auctionChecker () {
  const users = <any> await UserModel.find()
  const oneWeek = 1000 * 60 * 60 * 24 * 7
  for (let user of users) {
    let update = false
    for (let auction of user.auctions) {
      if (auction.isActive && (Date.now() - auction.created > 1000 )) {
        update = true
        auction.isActive = false
        if (auction.currentPrice > auction.threshold) {
          auction.winner = auction.offers[auction.offers.length - 1].user
        }
      }
      if (update) await user.save()
    }
  }
  setTimeout(auctionChecker, 2000)
}