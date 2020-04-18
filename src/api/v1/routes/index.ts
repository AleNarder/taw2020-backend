import * as express from 'express'

const router = express.Router()

router.use((req, res, next) => {
  next()
})

router
  .route('/')
  .get((req, res) => { res.end('Ready') })


export default router