import * as express from 'express'

const router = express.Router()

router.use((req, res, next) => {
  next()
})

router.get('/', (req, res, next) => {
  res.end('HELLO')
})


export default router