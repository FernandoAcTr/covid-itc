import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { settings } from '../config/settings'
import passport from 'passport'
import { getRepository } from 'typeorm'
import { Usuario } from '../entities/usuario.entity'

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: settings.SECRET,
  },
  async (payload, done) => {
    try {
      const user = await getRepository(Usuario).findOne({
        where: { usuario_id: payload },
      })
      console.log(user)

      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  }
)

passport.use(jwtStrategy)

export default passport
