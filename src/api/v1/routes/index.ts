import * as express from 'express'

// Controllers
import user from '../controllers/users'
import books from '../controllers/books'
import auctions from '../controllers/auctions'
import auth from '../controllers/auth'
import stats from '../controllers/stats'
import success from '../middlewares/success'

import * as passport from 'passport'
import { enableLoginAuth } from '../middlewares/auth/login'
import { enableJWTAuth } from '../middlewares/auth/jwt'
import { stat } from 'fs'


const router = express.Router()


/******************************
 * GUARD SECTION
 */

enableLoginAuth()
enableJWTAuth()
const JWTauth = passport.authenticate('jwt', {session: false})

/******************************
 * AUTH SECTION
 */
router
  .route('/auth/moderator')
  .post(auth.POST.moderator, success)

router
  .route('/auth/login')
  .post(auth.POST.login, success)

router
  .route('/auth/reset')
  .post(auth.POST.reset, success)

router
  .route('/auth/moderator')
  .post(JWTauth, auth.POST.moderator, success)
  
/******************************
 * USER SECTION
 */
router
  .route('/users')
  .get(JWTauth, user.GET.users, success)

router
  .route('/users/:userId')
  .get(JWTauth, user.GET.user, success)
  .delete(JWTauth, user.DELETE.user, success)
  .put(JWTauth, user.PUT.userProperty, success)

router
  .route('/user')
  .post(user.POST.user, success)
  
/******************************
 * BOOKS SECTION
 */

router
  .route('/books')
  .get(books.GET.books)

router
  .route('/books/:bookId')
  .put(books.PUT.book)
  .get(books.GET.book)

/******************************
 * AUCTIONS SECTION
 */
router
  .route('/auctions')
  .get(auctions.GET.auctions, success)
  .post(JWTauth, auctions.POST.auction, success)

router
  .route('/auction/user/:userId')
  .get(JWTauth, auctions.GET.userAuctions, success)

router
  .route('/auction/:userId/:auctionId')
  .get(auctions.GET.auction, success)
  .put(JWTauth, auctions.PUT.auctionProperty, success)
  .delete(JWTauth, auctions.DELETE.auction, success)

router
  .route('/auction/offer/:userId/:auctionId')
  .put(JWTauth, auctions.PUT.auctionOffer, success)


 /******************************
 * STATS SECTION
 */
router
  .route('/stats/student/:userId')
  .get(JWTauth, stats.GET.student, success)

router
  .route('/stats/moderator/')
  .get(JWTauth, stats.GET.moderator, success)


export default router