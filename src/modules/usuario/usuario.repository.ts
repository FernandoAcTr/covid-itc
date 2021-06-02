import { EntityRepository, AbstractRepository, Equal } from 'typeorm'
import { Usuario } from '../../entities/usuario.entity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { settings } from '../../config/settings'
import { ErrorHandler } from '../../middlewares/error_handler'
import { Rol } from '../../entities'

@EntityRepository(Usuario)
export class UsuarioRepository extends AbstractRepository<Usuario> {
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

  async findOne(usuario_id: string) {
    const usuario = await this.repository.findOne({
      where: { usuario_id: usuario_id },
      relations: ['estudiante', 'personal', 'medico'],
    })
    if (!usuario) throw new ErrorHandler(404, 'Usuario no encontrado')
    return usuario
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({
      where: { email },
      relations: ['estudiante', 'personal', 'medico'],
    })
  }

  async findAll() {
    return await this.repository.find({
      relations: ['estudiante', 'personal', 'medico'],
    })
  }

  async update(usuario_id: string, body: any) {
    const { email, password, habilitado, sospechoso, requireSurvey, rol } = body

    const user = await this.repository.findOneOrFail(usuario_id)
    user.email = email || user.email
    user.password =
      password !== undefined ? this.encrypPassword(password) : user.password
    user.habilitado = habilitado !== undefined ? habilitado : user.habilitado
    user.sospechoso = sospechoso !== undefined ? sospechoso : user.sospechoso
    user.requireSurvey =
      requireSurvey !== undefined ? requireSurvey : user.requireSurvey

    //update rol
    user.rol = rol
      ? await this.manager.getRepository(Rol).findOneOrFail({
          where: { rol: Equal(rol) },
        })
      : user.rol

    return await this.repository.save(user)
  }
}
