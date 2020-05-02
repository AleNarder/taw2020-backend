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
const auction_1 = require("../models/auction");
const ErrorHandler_1 = require("../../../helpers/ErrorHandler");
exports.default = {
    GET: {
        book: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const book = yield auction_1.AuctionModel.findById(req.params.bookId).select('book');
                    if (book) {
                        req.payload = book;
                        next();
                    }
                    else
                        throw new ErrorHandler_1.default(500, 'Cannot get the book');
                }
                catch (e) {
                    next(e);
                }
            });
        },
        books: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const books = yield auction_1.AuctionModel.find().select('book');
                    if (books) {
                        req.payload = books;
                        next();
                    }
                    else
                        throw new ErrorHandler_1.default(500, 'Cannot get any book');
                }
                catch (e) {
                    next(e);
                }
            });
        }
    },
    PUT: {
        book: function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const book = yield auction_1.AuctionModel.findById(req.params.bookId).select('book');
                    if (book) {
                        const { payload } = req.body;
                        for (let key in payload) {
                            book[key] = payload[key];
                        }
                    }
                    else
                        throw new ErrorHandler_1.default(500, 'Cannot update the book');
                }
                catch (e) {
                    next(e);
                }
            });
        }
    }
};
//# sourceMappingURL=books.js.map