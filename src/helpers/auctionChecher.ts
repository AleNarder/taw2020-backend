import { UserModel } from '../api/v1/models/user'
import emailSender from '../email/EmailSender'

export default async function auctionChecker () {
  const users = <any> await UserModel.find().select('auctions email')
  const checkInterval = 1000 * 30
  for (let user of users) {
    for (let auction of user.auctions) {
      let update = false
      let winner = null
      if (auction.isActive && (Date.now() - auction.expires > 0 )) {
        update = true
        auction.isActive = false
        if (auction.currentPrice > auction.threshold) {
          auction.winner = auction.offers[auction.offers.length - 1].user
          winner = await UserModel.findById(auction.winner).select('email')
        }
      }
      if (update) {
        try {
          await user.save()
          const link = `${process.env.CLIENT_BASE_URL}/auction?user=${user._id}&auction=${auction._id}`
          if (winner) {
            console.log('Notify buyer ')
            await emailSender.sendEmail('auction-success-buyer', winner.email, link, null, auction.book[0].title)
            console.log('Notify seller')
            await emailSender.sendEmail('auction-success-seller', user.email, link, null, auction.book[0].title)
          } else {
            console.log('sending fail ')
            await emailSender.sendEmail('auction-fail', user.email, link, null, auction.book[0].title)
          }
        } catch (e) {
          console.log('ERRORE', e)
        }
      }
    }
  }
  setTimeout(auctionChecker, checkInterval)
}