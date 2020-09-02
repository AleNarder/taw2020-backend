import * as express from 'express'

// Controllers
import user from '../controllers/users'
import auctions from '../controllers/auctions'
import auth from '../controllers/auth'
import stats from '../controllers/stats'
import success from '../middlewares/success'
// Validators
import authv from '../validators/auth'
import userv from '../validators/users'
import auctionv from '../validators/auctions'

import * as passport from 'passport'
import { enableLoginAuth } from '../middlewares/auth/login'
import { enableJWTAuth } from '../middlewares/auth/jwt'
import { validate } from '../middlewares/validator/index'

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
  .route('/auth/login')
  .post(validate.bind(authv.POST.login), auth.POST.login, success)

router
  .route('/auth/reset')
  .post(validate.bind(authv.POST.reset), auth.POST.reset, success)

router
  .route('/auth/moderator')
  .post(JWTauth, validate.bind(authv.POST.reset), validate.bind(authv.POST.moderator), auth.POST.moderator, success)
  
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

router
  .route('/user')
  .post(validate.bind(userv.POST.newUser), user.POST.user, success)
  

/******************************
 * AUCTIONS SECTION
 */

router
  .route('/auctions/:active')
  .get(auctions.GET.auctions, success)
  
router
  .route('/auction/user/:userId')
  .get(JWTauth, auctions.GET.userAuctions, success)
  .post(JWTauth, validate.bind(auctionv.POST.newAuction), auctions.POST.auction, success)

router
  .route('/auction/:userId/:auctionId')
  .get(auctions.GET.auction, success)
  .put(JWTauth, auctions.PUT.auctionProperty, success)
  .delete(JWTauth, auctions.DELETE.auction, success)



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