import { Interruptable } from '../helpers/Interruptable'
import * as io from 'socket.io'
import * as http from 'http'

class SocketUtils implements Interruptable {
  
  private socket = null
  
  private static tag = '[SOCKET]:'

  constructor (server: http.Server) {
    this.socket = io(server)
    console.log(`${SocketUtils.tag} enabled`)
    this.setCallbacks()
  }

  private setCallbacks (): void {
    this.socket.on('connection', this.newConnectionCallback)
    this.socket.on('newMessage', this.newMessageCallback)
  }

  private newConnectionCallback (socket): void {
    console.log(`${SocketUtils.tag} new connection`)
    socket.on('disconnect', () => {
      console.log(`${SocketUtils.tag} connection closed`)
    })
  }

  private newMessageCallback (msg): void {
    console.log(msg)
  }

  sigint(): Promise<Boolean> {
    try {
      this.socket.close()
      return new Promise((resolve, reject) => resolve(true))
    } catch (e) {
      return new Promise((resolve, reject) => resolve(false))
    }
  }
  sigterm(): Promise<Boolean> {
    try {
      this.socket.close()
      return new Promise((resolve, reject) => resolve(true))
    } catch (e) {
      return new Promise((resolve, reject) => resolve(false))
    }
  }
  sigusr2(): Promise<Boolean> {
    try {
      this.socket.close()
      return new Promise((resolve, reject) => resolve(true))
    } catch (e) {
      return new Promise((resolve, reject) => resolve(false))
    }
  }

}

export default SocketUtils