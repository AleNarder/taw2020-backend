import { Interruptable } from '../../../helpers/Interruptable'
import { MessagePayload } from '../models/message'
import MessageController from '../controllers/chat'
import * as io from 'socket.io'
import * as http from 'http'

class SocketUtils implements Interruptable {
  
  private io: io.Server = null

  private tag = '[SOCKET]: '
  private privateMessageEventTag = 'new-private-message'
  private publicMessageEventTag = 'new-public-message'
  private newEntryEventTag = 'new-entry'
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
  }

  private disconnect (client: io.Socket) {
    this.clients.delete(client.id)
    console.log(this.tag + ' connection closed')
  }

  private addClient (clientMongoID: string, client: io.Socket) {
    this.clients.set(client.id, clientMongoID)
    console.log(this.clients)
  }

  private newPrivateMessage(msg: MessagePayload, client: io.Socket) {
    console.log(this.tag + ' new private message')
    MessageController.newMessage('private', msg)
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
    console.log('message', msg)
    MessageController.newMessage('public', msg)
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