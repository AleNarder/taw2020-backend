import * as express from 'express'

// Controllers
import user from '../controllers/users'
import books from '../controllers/books'
import chats from '../controllers/chats'
import auctions from '../controllers/auctions'
import logger from '../controllers/logger'

const router = express.Router()


/******************************
 * GUARD SECTION
 */
router.use((req, res, next) => {
  next()
})

/******************************
 * LOGGER SECTION
 */
router
  .route('/signin')
  .post(logger.POST.signin)

router
  .route('/login')
  .post(logger.POST.login)

router
  .route('/logout')
  .post(logger.POST.logout)
  
/******************************
 * USER SECTION
 */
router
  .route('/users')
  .get(user.GET.users)

router
  .route('/users/:userId')
  .get(user.GET.user)
  .delete(user.DELETE.user)
  .put(user.PUT.userProperty)

router
    .route('/user')
    .post(user.POST.user)
  
/******************************
 * BOOKS SECTION
 */
router
  .route('/books')

/******************************
 * AUCTIONS SECTION
 */
router
  .route('/auctions')
  .get(auctions.GET.auctions)
  .post(auctions.POST.auction)

router
  .route('/auction/:auctionId')
  .get(auctions.GET.auction)

 /******************************
 * CHATS SECTION
 */

router
  .route('/chats/public/:auctionId')
  .get(chats.GET.public)

router
  .route('/chats/private/:auctionId/user/:userId')
  .get(chats.GET.private)

router
  .route('/chats/send/:chatId')
  .post(chats.POST.message)


export default router