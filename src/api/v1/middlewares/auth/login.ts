import * as passport from 'passport'
import { Strategy,  } from 'passport-local'
import { UserModel } from '../../models/user'

export default function enableLogin () {
  passport.use(
    new Strategy({
      usernameField: 'username',
      passwordField: 'password'
    }, function (username, password, done) {
      UserModel.find({
        username,
        password
      }, function (err, res) {
        if (!err) {
          if (res) {
            return done(null, { res })
          } else {
            return done( {
              code: 400,
              msg: 'Incorrect password or username'}, null)
          }
        } else {
          return done({
            code: 500,
            msg: 'Cannot find any user'
          }, null)
        }
      })
    })
  )
}

