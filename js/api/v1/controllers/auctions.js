"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auction_1 = require("./../models/auction");
const user_1 = require("../models/user");
const ErrorHandler_1 = require("../../../helpers/ErrorHandler");
exports.default = {
    POST: {
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        auction: function (req, res, next) {
            try {
                const user = req.body.id;
                const auction = new auction_1.AuctionModel(req.body.auction);
                user_1.UserModel.findByIdAndUpdate(user, { $push: { auctions: auction } }, (err, res) => {
                    if (!err) {
                        req.payload = res;
                        next();
                    }
                    else
                        throw new ErrorHandler_1.default(500, 'Auction not created');
                });
            }
            catch (e) {
                next(e);
            }
        }
    },
    GET: {
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        auctions: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const auctions = yield user_1.UserModel.find().select('auctions');
                    if (auctions) {
                        req.payload = auctions;
                        next();
                    }
                    else
                        throw new ErrorHandler_1.default(500, 'Cannot get any auction');
                }
                catch (e) {
                    next(e);
                }
            });
        },
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        auction: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId, auctionId } = req.params;
                    const user = yield user_1.UserModel.findById(userId);
                    if (user) {
                        req.payload = user.auctions.id(auctionId);
                        next();
                    }
                    else
                        throw new ErrorHandler_1.default(500, 'Cannot get the auction');
                }
                catch (e) {
                    next(e);
                }
            });
        }
    },
    PUT: {
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        auctionProperty: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId, auctionId } = req.params;
                    const { payload } = req.body;
                    const user = yield user_1.UserModel.findById(userId);
                    const auction = user.auctions.id(auctionId);
                    for (let key in payload) {
                        auction[key] = payload[key];
                    }
                    user.save((err, res) => {
                        if (!err) {
                            req.payload = res;
                            next();
                        }
                        else
                            throw new ErrorHandler_1.default(500, 'Auction not updated');
                    });
                }
                catch (e) {
                    next(e);
                }
            });
        }
    },
    DELETE: {
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        auction: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId, auctionId } = req.params;
                    const user = yield user_1.UserModel.findById(userId);
                    const auction = user.auctions.id(auctionId);
                    auction.isActive = false;
                    user.save((err, res) => {
                        if (!err) {
                            req.payload = res;
                            next();
                        }
                        else
                            throw new ErrorHandler_1.default(500, 'Auction not deleted');
                    });
                }
                catch (e) {
                    next(e);
                }
            });
        }
    },
};
//# sourceMappingURL=auctions.js.map