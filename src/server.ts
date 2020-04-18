import * as Express from 'express'
import DbUtils from './utils/db'
import router from './api/v1/routes/'

async function main () {
  const app = Express()
  const port = process.env.PORT || 5000
  const conn = await DbUtils.connect()
  if (conn) {
    app.use('/api/v1/', router)
    app.listen(port, () => {
      console.log(`Server listening on: http://localhost:${port}`)
    })
  }
}

main()


