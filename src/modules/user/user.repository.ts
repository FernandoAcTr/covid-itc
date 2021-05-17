import { EntityRepository, Repository } from 'typeorm'
import { Usuario } from '../../entities/usuario.entity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { settings } from '../../config/settings'

@EntityRepository(Usuario)
export class UserRepository extends Repository<Usuario> {
  encrypPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }

  comparePassword(user: Usuario, password: string) {
    return bcrypt.compareSync(password, user.password)
  }

  createToken(user: Usuario) {
    const token = jwt.sign(user.usuario_id, settings.SECRET)
    return token
  }
}
