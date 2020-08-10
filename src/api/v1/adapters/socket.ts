import { Interruptable } from '../../../helpers/Interruptable'
import { MessagePayload } from '../models/message'
import MessageController from '../controllers/chat'
import AuctionOffersController from '../controllers/auctionOffers'
import * as io from 'socket.io'
import * as http from 'http'
import { OfferPayload } from '../models/offer'

class SocketUtils implements Interruptable {
  
  private io: io.Server = null

  private tag = '[SOCKET]: '
  private privateMessageEventTag = 'new-private-message'
  private publicMessageEventTag = 'new-public-message'
  private newEntryEventTag = 'new-entry'
  private newAuctionOfferTag = 'new-offer'
  private newAuctionTag = 'new-auction'
  private clients = new Map<string, string>()

  constructor (server: http.Server) {
    this.io = io(server)
    this.setCallbacks()
  }

  private setCallbacks (): void {
    this.io.on('connection', this.newConnectionCallbacks.bind(this))
  }

  private newConnectionCallbacks (client: io.Socket): void {
    console.log(this.tag + 'new connection')
    client.on('disconnect', ()=> {
      this.disconnect(client)
    })
    client.on(this.newEntryEventTag, (msg) => {
      this.addClient(msg, client)
    })
    client.on(this.privateMessageEventTag, (msg) => {
      this.newPrivateMessage(msg, client)
    })
    client.on(this.publicMessageEventTag, (msg) => {
      this.newPublicMessage(msg, client)
    })
    client.on(this.newAuctionOfferTag, (msg) => {
      this.newAuctionOffer(msg, client)
    })
    client.on(this.newAuctionTag, () => {
      this.newAuction()
    })
  }

  private disconnect (client: io.Socket) {
    this.clients.delete(client.id)
    console.log(this.tag + ' connection closed')
  }

  private addClient (clientMongoID: string, client: io.Socket) {
    this.clients.set(client.id, clientMongoID)
    console.log(this.clients)
  }

  private newAuction() {
    this.io.sockets.emit(this.newAuctionOfferTag, {})
  }

  private newAuctionOffer (msg: OfferPayload, client: io.Socket) {
    try {
      console.log(this.tag + ' new offer')
      const now = Date.now()
      AuctionOffersController.auctionOffer(msg, now)
      this.io.sockets.emit(this.newAuctionOfferTag, {
        ...msg,
        timestamp: now
      })
    } catch (e) {

    }
  }

  private newPrivateMessage(msg: MessagePayload, client: io.Socket) {
    console.log(this.tag + ' new private message')
    const now = Date.now()
    MessageController.newMessage('private', msg, now)
    const receivers = [this.getKey(msg.senderId), this.getKey(msg.receiverId)]
    if (receivers.length > 0) {
      receivers.forEach((receiver) => {
        this.io.to(receiver).emit(this.privateMessageEventTag, {
          ...msg,
          timestamp: Date.now()
        })
      })
    }
  }

  private async newPublicMessage (msg: MessagePayload, client: io.Socket) {
    console.log(this.tag + ' new public message')
    const now = Date.now()
    MessageController.newMessage('public', msg, now)
    this.io.sockets.emit(this.publicMessageEventTag, {
      ...msg,
      timestamp: Date.now()
    })
  }

  private getKey(val): string {
    const tuple = [...this.clients.entries()].find(([key, value]) => val === value)
    return tuple ? tuple[0] : null
  }


  sigint(): Promise<Boolean> {
    try {
      this.io.close()
      return new Promise((resolve, reject) => resolve(true))
    } catch (e) {
      return new Promise((resolve, reject) => resolve(false))
    }
  }
  sigterm(): Promise<Boolean> {
    try {
      this.io.close()
      return new Promise((resolve, reject) => resolve(true))
    } catch (e) {
      return new Promise((resolve, reject) => resolve(false))
    }
  }
  sigusr2(): Promise<Boolean> {
    try {
      this.io.close()
      return new Promise((resolve, reject) => resolve(true))
    } catch (e) {
      return new Promise((resolve, reject) => resolve(false))
    }
  }

}

export default SocketUtils