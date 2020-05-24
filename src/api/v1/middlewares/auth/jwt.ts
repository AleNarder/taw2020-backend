import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserModel } from '../../models/user'
import * as passport from 'passport'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ENCRYPTION
}

function enableJWTAuth() {
  passport.use(new Strategy(options, function (payload, done) {
    UserModel.findById(payload.id, function (err, res) {
      if (res) {
        return done(null, true)
      } else {
        return done(null, true)
      }
    })
  }))
}

export { enableJWTAuth }