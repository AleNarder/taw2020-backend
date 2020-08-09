import * as dotenv from 'dotenv'
dotenv.config()

import * as http from 'http'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

import apiRouter from './api/v1/routes'
import idxRouter from './api/index/routes'
import DbUtils from './api/v1/adapters/db'
import SocketUtils from './api/v1/adapters/socket'
import auctionChecker from './helpers/auctionChecher'
import error from './api/v1/middlewares/error'


function check (...args: any) {
  const reducer = (acc, x) => acc && x
  return args.reduce(reducer)
}

async function main () {
  const tag = '[SERVER]:'
  const app = express()
  const server = http.createServer(app)
  new SocketUtils(server)
  const conn = await new DbUtils().connect()
  const port = process.env.PORT || 5000
  if (check(conn)) {
    app.use(bodyParser.json())
    app.use(cors())
    app.use('/api/v1/', apiRouter)
    app.use('/', idxRouter)
    app.use(function(err, req, res, next) {
      error(err, req, res, next)
    })
    server.listen(port, () => {
      console.log(`${tag} http://localhost:${port}`)
    })
    auctionChecker()
  } else {
    console.log(`[${tag} not listening`)
  }
}

main()

