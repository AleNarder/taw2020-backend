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
                const user = req.params.userId;
                req.body.auction.isActive = true;
                req.body.auction.winner = null;
                req.body.auction.chats = [{
                        'scope': 'public'
                    }];
                const auction = new auction_1.AuctionModel(req.body.auction);
                user_1.UserModel.findByIdAndUpdate(user, { $push: { auctions: auction } }, (err, res) => {
                    if (!err) {
                        req.payload = res;
                        next();
                    }
                    else
                        throw new ErrorHandler_1.default(500, 'Inserzione non creata');
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
                    const usersAuctions = yield user_1.UserModel.find().select('auctions location');
                    if (usersAuctions) {
                        for (let userAuctions of usersAuctions) {
                            if (req.params.active == 'active') {
                                userAuctions.auctions = userAuctions.auctions.filter(auction => auction.isActive);
                            }
                            for (let userAuction of userAuctions.auctions) {
                                userAuction['usr'] = userAuctions._id;
                            }
                        }
                        req.payload = usersAuctions;
                        next();
                    }
                    else
                        next(new ErrorHandler_1.default(500, 'Imposssibile accedere alle inserzioni'));
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
                        next(new ErrorHandler_1.default(500, "Impossibile accedere all'inserzione"));
                }
                catch (e) {
                    next(e);
                }
            });
        },
        userAuctions: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId } = req.params;
                    const user = yield user_1.UserModel.findById(userId);
                    if (user) {
                        req.payload = user.auctions;
                        next();
                    }
                    else
                        next(new ErrorHandler_1.default(500, "Impossibile accedere all'inserzione"));
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
                    const payload = req.body;
                    const user = yield user_1.UserModel.findById(userId);
                    const auctionIdx = user.auctions.findIndex(auction => auction._id == auctionId);
                    user.auctions[auctionIdx] = Object.assign(Object.assign({}, user.auctions[auctionIdx]), payload);
                    user.save((err, res) => {
                        if (!err) {
                            req.payload = res;
                            next();
                        }
                        else
                            next(new ErrorHandler_1.default(500, 'Inserzione non aggiornata'));
                    });
                }
                catch (e) {
                    next(e);
                }
            });
        },
        auctionOffer: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId, auctionId } = req.params;
                    const payload = req.body;
                    const user = yield user_1.UserModel.findById(userId);
                    const offerent = yield user_1.UserModel.findById(payload.user);
                    const auction = user.auctions.id(auctionId);
                    if (auction.offers.length === 0 || auction.currentPrice < payload.amount) {
                        auction.offers.push({
                            user: payload.user,
                            username: offerent.username,
                            amount: payload.amount,
                            timestamp: Date.now(),
                            delta: payload.amount - auction.currentPrice
                        });
                        auction.currentPrice = payload.amount;
                    }
                    else {
                        next(new ErrorHandler_1.default(400, 'Offerta troppo bassa'));
                    }
                    user.save((err, res) => {
                        if (!err) {
                            req.payload = res;
                            next();
                        }
                        else {
                            console.log(err);
                            next(new ErrorHandler_1.default(500, 'Offerta non aggiunta'));
                        }
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
                    user_1.UserModel.findByIdAndUpdate(userId, {
                        '$pull': {
                            'auctions': {
                                '_id': auctionId
                            }
                        }
                    }, (err, res) => {
                        if (!err) {
                            req.payload = res;
                            next();
                        }
                        else
                            next(new ErrorHandler_1.default(500, 'Inserzione non eliminata'));
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