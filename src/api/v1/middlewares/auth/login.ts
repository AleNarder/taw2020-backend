import * as passport from 'passport'
import { Strategy } from 'passport-local'
import { UserModel } from '../../models/user'

function enableLoginAuth () {
  passport.use(
    new Strategy( function (email, password, done) {
      UserModel.findOne({
        email,
        password
      }, function (err, res) {
        if (!err) {
          if (res) {
            return done(null, { res })
          } else {
            return done( {
              code: 400,
              msg: 'Password o username errati'}, null)
          }
        } else {
          return done({
            code: 500,
            msg: 'Impossibile trovare alcun utente'
          }, null)
        }
      })
    })
  )
}

export { enableLoginAuth }