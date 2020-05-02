import { UserModel } from './../models/user'
import * as Geocoder from 'node-geocoder'
import ErrorHandler from '../../../helpers/ErrorHandler'


export default {
  GET: {
    /**
     * Get the whole list of users
     * Used by admin
     * @param req request
     * @param res response
     * @param next next function to execute in the pipeline
     */
    users: async function (req, res, next) {
      try {
        UserModel.find((err, res) => {
          if (!err) {
            req.payload = res
            next()
          } else {
            throw new ErrorHandler(500, 'Collection not reachable')
          }
        })
      } catch (e) {
        next(e)
      }
    },
    /**
     * Get single user info
     * Used by admin
     * @param req request
     * @param res response
     * @param next next function to execute in the pipeline
     */
    user: function (req, res, next) {
      try {
        UserModel.findById(req.params.userId, (err, res) => {
          if (!err) {
            req.payload = res
            next()
          } else {
            throw new ErrorHandler(500, 'Collection not reachable')
          }
        })
      } catch (e) {
        next(e)
      }
    }
  },
  POST: {
    /**
     * Create a new user
     * Used in signIn
     * @param req request
     * @param res response
     * @param next next function to execute in the pipeline
     */
    user: async function (req, res, next) {
      try {
        const options: Geocoder.GenericOptions = {
          provider: 'locationiq',
          apiKey: process.env.GEOCODER_API_KEY
        }
        const geocoder = Geocoder(options)
        const {address, zipcode, state, country} = req.body
        const {latitude, longitude} = (await geocoder.geocode(`${address}, ${zipcode}, ${state}, ${country}`))[0]
        req.body.location = {type: 'Point', 'coordinates': [longitude, latitude]}
        const user = new UserModel(req.body)
        user.save(null, (err, res) => {
          if (!err) {
            req.payload = res
            next()
          } else {
            throw new ErrorHandler(500, 'User not saved')
          }
        })
      } catch (e) {
        next(e)
      }
    }
  },
  PUT: {
    /**
     * Modify user info or role
     * Used by admin (when promoting user) or by user for itself
     * @param req request
     * @param res response
     * @param next next function to execute in the pipeline
     */
    userProperty:  function (req, res, next) {
      try {
        UserModel.findByIdAndUpdate(req.params.userId, req.body, (err, res) => {
          if (!err) {
            req.payload = res
          } else {
            throw new ErrorHandler(500, 'User not updated')
          }
        })
        next()
      } catch (e) {
        next(e)
      }
    }
  },
  DELETE: {
    /**
     * Delete user
     * Used by user
     * @param req request
     * @param res response
     * @param next next function to execute in the pipeline
     */
    user: async function (req, res, next) {
      try {
        UserModel.findByIdAndDelete(req.params.userId, (err, res) => {
          if (!err) {
            req.payload = res
            next()
          } else {
            throw new ErrorHandler(500, 'User not deleted')
          }
        })
      } catch (e) {
        next(e)
      }
    }
  }
}