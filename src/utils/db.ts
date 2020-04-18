import * as mongoose from 'mongoose'
import { Db } from 'mongodb'

class DbUtils {
  
  private static username = 'heroku_v868mw88'
  private static password = 'lfi13lqoa66h6bf56das06dthg'
  private static database = 'heroku_v868mw88'
  private static host = 'ds251799.mlab.com'
  private static port = 51799
  
  private static options = {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true
  }

  /**
   * Establish a mongoose connection
   */
  public static async connect (): Promise<boolean> {
    let isConnected = true
    try {
      this.setCallbacks()
      await mongoose.connect([
        `mongodb://`,
        `${this.username}`,
        `:${this.password}`,
        `@${this.host}`,
        `:${this.port}`,
        `/${this.database}`
      ].join(''), this.options)
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
  public static async close (msg?: string, callback?: Function): Promise<boolean> {
    let isClosed = true
    try {
      await mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`)
        callback()
      })
    } catch (err) {
      console.error(err)
      isClosed = false
    } finally {
      return isClosed
    }
  }

  private static setCallbacks (): void {
    mongoose.connection.on('connected', this.connectedCallback)
    mongoose.connection.on('error', this.errorCallback)
    mongoose.connection.on('disconnected', this.disconnectedCallback)
  }

  private static connectedCallback (): void {
    console.log('Mongoose connected')
  }

  private static disconnectedCallback (): void {
    console.log('Mongoose disconnected')
  }

  private static errorCallback (error): void {
    console.error(`Mongoose error: ${error}`)
  }

}

/**
 * Nodemon restarted
 */
process.once('SIGUSR2',() => {
  DbUtils.close('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2')
  })
})

/**
 * Heroku closes the app
 */
process.on('SIGTERM', async () => {
  DbUtils.close('Heroku shutdown', () => {
    process.exit(0)
  })
})

/**
 * App has been terminated by SIGINT
 */
process.on('SIGINT', async () => {
  DbUtils.close('app termination', () => {
    process.exit(0)
  })  
})

export default DbUtils