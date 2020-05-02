import {Strategy, ExtractJwt} from 'passport-jwt'
import { UserModel } from '../../models/user'
import * as passport from 'passport'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ENCRYPTION
}

function enableJWTauth() {
  passport.use(new Strategy(options, function (payload, done) {
    UserModel.findById(payload.id, (err, res) => done(err, {res}))
  }))
}

const JWTauth = passport.authenticate('jwt', {session: false})

export {JWTauth, enableJWTauth }