import { UserModel } from './../models/user'
import ErrorHandler from '../../../helpers/ErrorHandler'
import EmailSender from '../../../email/EmailSender'
import * as jwt from 'jsonwebtoken'


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
        if (req.body.email) {
          UserModel.findOne({email: req.body.email}, async function(err, usr) {
            if (!usr) {
              const user = new UserModel(req.body)
              user.save(null, (err, res) => { 
                if (!err) {
                  const baseLink = `${process.env.CLIENT_BASE_URL}/login?id=${res._id}`
                  const token = jwt.sign({id: res._id}, process.env.JWT_ENCRYPTION, {
                    expiresIn: '1h'
                  })
                  const link = [baseLink, token].join('&tkn=')
                  EmailSender.sendEmail("confirm-user", req.body.email, link)
                  .then((value) => {
                    console.log('[NEW USER]: email inviata')
                    next()
                  })
                  .catch((error) => {
                    console.log('[NEW USER]: email non inviata')
                    next(error) 
                  }) 
                } else {
                  console.log(err)
                  next(new ErrorHandler(500, 'Utente non salvato'))
                }
              })  
            } else {
              next(new ErrorHandler(400, 'Utente già esistente'))
            }
          })
        }
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
            next()
          } else {
            next(new ErrorHandler(500, 'Utente non aggiornato'))
          }
        })
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
            next(new ErrorHandler(500, 'User not deleted'))
          }
        })
      } catch (e) {
        
      }
    }
  }
}