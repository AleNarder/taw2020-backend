import * as mongoose from 'mongoose'
import { Interruptable } from './../../../helpers/Interruptable'

class DbUtils implements Interruptable {
  
  private static username = process.env.DB_USERNAME
  private static password = process.env.DB_PASSWORD
  private static database = process.env.DB_DATABASE
  private static host = process.env.DB_HOST
  private static port = process.env.DB_PORT

  private static tag = '[MONGOOSE]:'

  private static options = {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true
  }

  /**
   * Establish a mongoose connection
   */
  public async connect (): Promise<boolean> {
    let isConnected = true
    try {
      this.setCallbacks()
      await mongoose.connect([
        `mongodb://`,
        `${DbUtils.username}`,
        `:${DbUtils.password}`,
        `@${DbUtils.host}`,
        `:${DbUtils.port}`,
        `/${DbUtils.database}`
      ].join(''), DbUtils.options)
    } catch (err) {
      console.error(err.reason)
      isConnected = false
    } finally {
      return isConnected
    }
  }

  /**
   * Close a mongoose connection
   * @param msg 
   * @param callback 
   */
  public async close (msg: string): Promise<boolean> {
    let isClosed = true
    try {
      await mongoose.connection.close(() => {
        console.log(`${DbUtils.tag} disconnected through ${msg}`)
      })
    } catch (err) {
      console.error(err)
      isClosed = false
    } finally {
      return isClosed
    }
  }

  private setCallbacks (): void {
    mongoose.connection.on('connected', this.connectedCallback)
    mongoose.connection.on('error', this.errorCallback)
  }

  private connectedCallback (): void {
    console.log(`${DbUtils.tag} connected`)
  }

  private errorCallback (error): void {
    console.error(`${DbUtils.tag} error: ${error}`)
  }

  public async sigint(): Promise<Boolean> {
    const disconnected = await this.close('sigint')
    return disconnected
  }
  public async sigterm(): Promise<Boolean> {
    const disconnected = await this.close('sigterm')
    return disconnected
  }
  
  public async sigusr2(): Promise<Boolean> {
    const disconnected = await this.close('sigusr2')
    return disconnected
  }

}

export default DbUtils