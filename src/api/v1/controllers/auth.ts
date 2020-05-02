import * as passport from 'passport'
import * as jwt from 'jsonwebtoken'
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
      try {
        passport.authenticate('local', {session: false}, (err, user) => {
          if (err) {
            throw new ErrorHandler(err.code, err.msg)
          } else {
            req.payload = {
              token: jwt.sign(user, process.env.JWT_ENCRYPTION, {
                expiresIn: '12h'
              }),
              user
            }
            next()
          }
        })(req, res, next)
      } catch (e) {
        next(e)
      }
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
    signin: function (req, res, next) {

    }
  }
}