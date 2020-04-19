import * as express from 'express'
import status from '../controllers/status'

const router = express.Router()

router
  .route('/')
  .get(status.GET.status)

export default router