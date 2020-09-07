import * as express from 'express'
import status from '../controllers/status'

const router = express.Router()

router
  .route('/')
  .get(status.GET.status)

router
  .route('/docs/backend')
  .get(docs.backend)

router
  .route('/docs/frontend')
  .get(docs.frontend)

export default router