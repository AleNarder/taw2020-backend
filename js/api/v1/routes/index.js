"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// Controllers
const users_1 = require("../controllers/users");
const auctions_1 = require("../controllers/auctions");
const auth_1 = require("../controllers/auth");
const stats_1 = require("../controllers/stats");
const success_1 = require("../middlewares/success");
// Validators
const auth_2 = require("../validators/auth");
const users_2 = require("../validators/users");
const auctions_2 = require("../validators/auctions");
const passport = require("passport");
const login_1 = require("../middlewares/auth/login");
const jwt_1 = require("../middlewares/auth/jwt");
const index_1 = require("../middlewares/validator/index");
const router = express.Router();
/******************************
 * GUARD SECTION
 */
login_1.enableLoginAuth();
jwt_1.enableJWTAuth();
const JWTauth = passport.authenticate('jwt', { session: false });
/******************************
 * AUTH SECTION
 */
router
    .route('/auth/login')
    .post(index_1.validate.bind(auth_2.default.POST.login), auth_1.default.POST.login, success_1.default);
router
    .route('/auth/reset')
    .post(index_1.validate.bind(auth_2.default.POST.reset), auth_1.default.POST.reset, success_1.default);
router
    .route('/auth/moderator')
    .post(JWTauth, index_1.validate.bind(auth_2.default.POST.reset), index_1.validate.bind(auth_2.default.POST.moderator), auth_1.default.POST.moderator, success_1.default);
/******************************
 * USER SECTION
 */
router
    .route('/users')
    .get(JWTauth, users_1.default.GET.users, success_1.default);
router
    .route('/users/:userId')
    .get(JWTauth, users_1.default.GET.user, success_1.default)
    .delete(JWTauth, users_1.default.DELETE.user, success_1.default);
router
    .route('/user')
    .post(index_1.validate.bind(users_2.default.POST.newUser), users_1.default.POST.user, success_1.default);
/******************************
 * AUCTIONS SECTION
 */
router
    .route('/auctions/:active')
    .get(auctions_1.default.GET.auctions, success_1.default);
router
    .route('/auction/user/:userId')
    .get(JWTauth, auctions_1.default.GET.userAuctions, success_1.default)
    .post(JWTauth, index_1.validate.bind(auctions_2.default.POST.newAuction), auctions_1.default.POST.auction, success_1.default);
router
    .route('/auction/:userId/:auctionId')
    .get(auctions_1.default.GET.auction, success_1.default)
    .put(JWTauth, auctions_1.default.PUT.auctionProperty, success_1.default)
    .delete(JWTauth, auctions_1.default.DELETE.auction, success_1.default);
/******************************
* STATS SECTION
*/
router
    .route('/stats/student/:userId')
    .get(JWTauth, stats_1.default.GET.student, success_1.default);
router
    .route('/stats/moderator/')
    .get(JWTauth, stats_1.default.GET.moderator, success_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map