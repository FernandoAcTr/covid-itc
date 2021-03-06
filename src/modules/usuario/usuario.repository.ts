import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { EntityRepository, AbstractRepository, Equal } from 'typeorm'
import { Usuario, Rol } from '../../entities'
import { settings } from '../../config/settings'
import { ErrorHandler } from '../../middlewares'

@EntityRepository(Usuario)
export class UsuarioRepository extends AbstractRepository<Usuario> {
  encrypPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }

  comparePassword(user: Usuario, password: string): boolean {
    return bcrypt.compareSync(password, user.password)
  }

  createToken(user: Usuario): string {
    const token = jwt.sign(user.usuario_id, settings.SECRET)
    return token
  }

  async findOne(usuario_id: string): Promise<Usuario> {
    const usuario = await this.repository.findOne({
      where: { usuario_id: usuario_id },
      relations: ['estudiante', 'personal', 'medico'],
    })
    if (!usuario) throw new ErrorHandler(404, 'Usuario no encontrado')
    return usuario
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    return await this.repository.findOne({
      where: { email },
      relations: ['estudiante', 'personal', 'medico'],
    })
  }

  async findAll(): Promise<Usuario[]> {
    return await this.repository.find({
      relations: ['estudiante', 'personal', 'medico'],
    })
  }

  async update(usuario_id: string, body: any): Promise<Usuario> {
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
