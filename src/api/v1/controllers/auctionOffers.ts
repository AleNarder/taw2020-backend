import { OfferPayload } from "../models/offer";
import { UserModel } from "../models/user";

export default {
  /**
   * Aggiunge un'offerta ad un'inserzione
   * @param payload 
   * @param timestamp 
   */
  async auctionOffer (payload: OfferPayload, timestamp) {
    try {
      const user = <any> await UserModel.findById(payload.receiverId)
      const auction = user.auctions.id(payload.auctionId)
      if (auction.offers.length === 0 || auction.currentPrice < payload.amount) {
        auction.offers.push({
          user: payload.offerentId,
          username: payload.offerentUs,
          amount: payload.amount,
          delta: payload.delta,
          timestamp
        })
        auction.currentPrice = payload.amount
      } else {
        console.log('offerta troppo bassa')
      }
      user.save((err, res) => {
        if (err) {
          console.log(err)
        }
      })
    } catch (e) {

    }
  }
}