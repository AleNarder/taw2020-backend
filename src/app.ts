import * as express from 'express'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import apiRouter from './api/v1/routes'
import idxRouter from './api/index/routes'
import DbUtils from './api/v1/models/db'
import ioUtils from './socket'

dotenv.config()

function check (...args) {
  const reducer = (acc, x) => acc && x
  return args.reduce(reducer)
}

async function main () {
  const app = express()
  const server = http.createServer(app)
  const socket = new ioUtils().openSocket(server)
  const conn = await new DbUtils().connect()
  const port = process.env.PORT || 5000
  if (check(socket, conn)) {
    app.use(bodyParser.json())
    app.use('/api/v1/', apiRouter)
    app.use('/', idxRouter)
    app.listen(port, () => {
      console.log(`Server listening on: http://localhost:${port}`)
    })
  } else {
    console.log(`Server is not listening`)
  }
}

main()

