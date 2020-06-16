"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// Controllers
const users_1 = require("../controllers/users");
const books_1 = require("../controllers/books");
const chats_1 = require("../controllers/chats");
const auctions_1 = require("../controllers/auctions");
const auth_1 = require("../controllers/auth");
const success_1 = require("../middlewares/success");
const passport = require("passport");
const login_1 = require("../middlewares/auth/login");
const jwt_1 = require("../middlewares/auth/jwt");
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
    .route('/auth/moderator')
    .post(auth_1.default.POST.moderator, success_1.default);
router
    .route('/auth/login')
    .post(auth_1.default.POST.login, success_1.default);
router
    .route('/auth/reset')
    .post(auth_1.default.POST.reset, success_1.default);
router
    .route('/auth/moderator')
    .post(JWTauth, auth_1.default.POST.moderator, success_1.default);
/******************************
 * USER SECTION
 */
router
    .route('/users')
    .get(JWTauth, users_1.default.GET.users, success_1.default);
router
    .route('/users/:userId')
    .get(JWTauth, users_1.default.GET.user, success_1.default)
    .delete(JWTauth, users_1.default.DELETE.user, success_1.default)
    .put(JWTauth, users_1.default.PUT.userProperty, success_1.default);
router
    .route('/user')
    .post(users_1.default.POST.user, success_1.default);
/******************************
 * BOOKS SECTION
 */
router
    .route('/books')
    .get(books_1.default.GET.books);
router
    .route('/books/:bookId')
    .put(books_1.default.PUT.book)
    .get(books_1.default.GET.book);
/******************************
 * AUCTIONS SECTION
 */
router
    .route('/auctions')
    .get(auctions_1.default.GET.auctions, success_1.default)
    .post(auctions_1.default.POST.auction, success_1.default);
router
    .route('/auction/:userId/:auctionId')
    .get(auctions_1.default.GET.auction, success_1.default)
    .put(auctions_1.default.PUT.auctionProperty, success_1.default)
    .delete(auctions_1.default.DELETE.auction, success_1.default);
/******************************
* CHATS SECTION
*/
router
    .route('/chats/public/:auctionId')
    .get(chats_1.default.GET.public, success_1.default);
router
    .route('/chats/private/:auctionId/user/:userId')
    .get(chats_1.default.GET.private, success_1.default);
router
    .route('/chats/send/:chatId')
    .post(chats_1.default.POST.message, success_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map