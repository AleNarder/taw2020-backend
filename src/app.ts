import * as dotenv from 'dotenv'
dotenv.config()

import * as http from 'http'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

import apiRouter from './api/v1/routes'
import idxRouter from './api/index/routes'
import DbUtils from './api/v1/models/db'
import SocketUtils from './chat/socket'
import { Interruptable } from './helpers/Interruptable'


function check (...args: any) {
  const reducer = (acc, x) => acc && x
  return args.reduce(reducer)
}

function interrupt (...arg: Interruptable[]) {
  //TODO
}


async function main () {
  const tag = '[SERVER]:'
  const app = express()
  const server = http.createServer(app)
  const socket = new SocketUtils(server)
  const conn = await new DbUtils().connect()
  const port = process.env.PORT || 5000
  if (check(conn)) {
    app.use(bodyParser.json())
    app.use(cors())
    app.use('/api/v1/', apiRouter)
    app.use('/', idxRouter)
    server.listen(port, () => {
      console.log(`${tag} http://localhost:${port}`)
    })
  } else {
    console.log(`[${tag} not listening`)
  }
}

main()

