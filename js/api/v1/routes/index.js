"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const users_1 = require("../controllers/users");
const chats_1 = require("../controllers/chats");
const logger_1 = require("../controllers/logger");
const router = express.Router();
/******************************
 * GUARD SECTION
 */
router.use((req, res, next) => {
    next();
});
/******************************
 * LOGGER SECTION
 */
router
    .route('/signin')
    .post(logger_1.default.POST.signin);
router
    .route('/login')
    .post(logger_1.default.POST.login);
router
    .route('/logout')
    .post(logger_1.default.POST.logout);
/******************************
 * USER SECTION
 */
router
    .route('/users')
    .get(users_1.default.GET.users);
router
    .route('/users/:userId')
    .get(users_1.default.GET.user)
    .delete(users_1.default.DELETE.user)
    .put(users_1.default.PUT.userProperty);
/******************************
 * BOOKS SECTION
 */
router
    .route('/books');
/******************************
 * AUCTIONS SECTION
 */
router
    .route('/auctions');
router
    .route('/auction/:auctionId');
/******************************
* CHATS SECTION
*/
router
    .route('/chats/public/:auctionId')
    .get(chats_1.default.GET.public);
router
    .route('/chats/private/:auctionId/user/:userId')
    .get(chats_1.default.GET.private);
router
    .route('/chats/send/:chatId')
    .post(chats_1.default.POST.message);
exports.default = router;
