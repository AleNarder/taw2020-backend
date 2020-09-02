import * as passport from 'passport'
import * as jwt from 'jsonwebtoken'
import { UserModel } from '../models/user'
import emailSender from '../../../email/EmailSender'
import ErrorHandler from '../../../helpers/ErrorHandler'

export default {
  POST: {
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    login: function (req, res, next) {
      passport.authenticate('local', {session: false}, (err, user) => {
        if (err) {
          next(new ErrorHandler(err.code, err.msg))
        } else {
          if (user.res.confirmed) {
            req.payload = {
              token: jwt.sign({id: user.res._id}, process.env.JWT_ENCRYPTION, {
                expiresIn: '1h'
              }),
              user: user.res
            }
            next()
            } else {
              next(new ErrorHandler(400, 'Utente non confermato: controlla la tua casella email'))
            }
          }
      })(req, res, next)
    },

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    moderator: function (req, res, next) {
      const user = UserModel.findOne({email: req.body.email}, function(err, usr) {
        if (!usr) {
          const baselink = `${process.env.CLIENT_BASE_URL}/login?moderator=true`
          const token = jwt.sign({email: req.body.email}, process.env.JWT_ENCRYPTION, {
            expiresIn: '1h'
          })
          const link = `${baselink}&tkn=${token}&email=${req.body.email}`
          emailSender.sendEmail("new-moderator", req.body.email, link)
          .then((value) => {
            console.log('[MODERATOR]: Mail inviata')
            next()
          }).catch((error) => {
            console.log('[MODERATOR]: Mail non inviata')
            next(error)
          })
        } else {
          next(new ErrorHandler(400, 'Utente già registrato'))
        }
      })
    },

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    reset: function (req, res, next) {
      const user  = UserModel.findOne({ email: req.body.email}, function(err, usr) {
        if (usr) {
          const baseLink = `${process.env.CLIENT_BASE_URL}/resetpassword?usr=${usr._id}`
          const token = jwt.sign({id: usr._id}, process.env.JWT_ENCRYPTION, {
            expiresIn: '1h'
          })
          const link = [baseLink, token].join('&tkn=')
          emailSender.sendEmail('reset-password', req.body.email, link)
          .then((value) => {
            next()
          })
          .catch((error) => {
            next(error)
          })
        }
      }) 
    }
  }
}