import * as express from 'express'
import apiRouter from './api/v1/routes'
import idxRouter from './api/index/routes'
import DbUtils from './api/v1/models/db'

async function main () {
  const app = express()
  const port = process.env.PORT || 5000
  const conn = await DbUtils.connect()
  if (conn) {
    app.use('/api/v1/', apiRouter)
    app.use('/', idxRouter)
    app.listen(port, () => {
      console.log(`Server listening on: http://localhost:${port}`)
    })
  }
}

main()

