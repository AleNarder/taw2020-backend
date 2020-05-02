import { AuctionModel } from '../models/auction'
import ErrorHandler from '../../../helpers/ErrorHandler'

export default {
  GET: {
    book: async function (req, res, next) {
      try {
        const book = await AuctionModel.findById(req.params.bookId).select('book')
        if (book) {
          req.payload = book
          next()
        } else throw new ErrorHandler(500, 'Cannot get the book')
      } catch (e) {
        next(e)
      }
    },
    books: async function (req, res, next) {
      try {
        const books = await AuctionModel.find().select('book')
        if (books) {
          req.payload = books
          next()
        } else throw new ErrorHandler(500, 'Cannot get any book')
      } catch (e) {
        next(e)
      }
    }
  },
  PUT: {
    book: async function (req, res, next) {
      try {
        const book = await AuctionModel.findById(req.params.bookId).select('book')
        if (book) {
          const {payload} = req.body
          for (let key in payload) {
            book[key] = payload[key]
          }
        } else throw new ErrorHandler(500, 'Cannot update the book')
      } catch (e) {
        next(e)
      }
    }
  }
}