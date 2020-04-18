import * as express from 'express'

const router = express.Router()

router
  .use((req, res, next) => { next() })

router
  .route('/')
  .get((req, res, next) => { res.end('OK') })

router.
  route('login')
  .post()

export default router