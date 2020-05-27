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
            console.log(user)
            if (user.res.confirmed) {
              req.payload = {
                token: jwt.sign({id: user.res._id}, process.env.JWT_ENCRYPTION, {
                  expiresIn: '1h'
                }),
                user: user.res
              }
              next()
              } else {
                next(new ErrorHandler(400, 'Utente non confermato: controllata la tua casella email'))
              }
            }
        })(req, res, next)
    },
    moderator: function (req, res, next) {
      const baselink = `${process.env.CLIENT_BASE_URL}/register?moderator=true`
      const token = jwt.sign(req.body.moderator, process.env.JWT_ENCRYPTION, {
        expiresIn: '1h'
      })
      const link = [baselink, token].join("?tkn=")
      emailSender.sendEmail("new-moderator", req.body.email, link, req.body.moderator)
    },
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    logout: function (req, res, next) {

    },
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    reset: function (req, res, next) {
      const user  = UserModel.findOne({ email: req.body.email}, function(err, usr) {
        const baseLink = `${process.env.CLIENT_BASE_URL}/resetpassword?usr=${usr._id}`
        const token = jwt.sign({id: res._id}, process.env.JWT_ENCRYPTION, {
          expiresIn: '1h'
        })
        const link = [baseLink, token].join('&tkn=')
        emailSender.sendEmail('reset-password', req.body.email, link)
        .then((value) => {
          console.log('[RESET]: Mail inviata')
          next()
        })
        .catch((error) => {
          console.log('[RESET]: Mail non inviata')
          next(error)
        })
      })
    }
  }
}