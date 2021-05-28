import { In } from 'typeorm'
import { Medico, Rol, RolEnum } from '../../entities'
import { UsuarioRepository } from '../usuario/usuario.repository'
import { Usuario } from '../../entities/usuario.entity'
import { ErrorHandler } from '../../middlewares/error_handler'
import { EntityRepository, AbstractRepository } from 'typeorm'

@EntityRepository(Medico)
export class MedicoRepository extends AbstractRepository<Medico> {
  async store(body: any) {
    const { nombre, a_paterno, a_materno, rfc, cedula, email, password } = body
    const userRepository = this.manager.getCustomRepository(UsuarioRepository)

    // Create user Role
    const userRol = await this.manager.getRepository(Rol).findOneOrFail({
      where: { rol: In([RolEnum.MEDICO]) },
    })

    //create user
    const usuario = new Usuario()
    usuario.email = email
    usuario.password = userRepository.encrypPassword(password)
    usuario.roles = [userRol]
    usuario.requireSurvey = false

    //create medico
    const medico = new Medico()
    medico.nombre = nombre
    medico.a_materno = a_materno
    medico.a_paterno = a_paterno
    medico.usuario = usuario
    medico.rfc = rfc
    medico.cedula = cedula

    return await this.repository.save(medico)
  }

  async findOne(medico_id: string) {
    const medico = await this.repository.findOne(medico_id, {
      relations: ['usuario'],
    })
    if (!medico)
      throw new ErrorHandler(404, 'No existe el medico con id ' + medico_id)

    return medico
  }

  async findAll() {
    const medicos = await this.manager
      .createQueryBuilder(Medico, 'm')
      .leftJoinAndSelect('m.usuario', 'u')
      .leftJoinAndSelect('u.roles', 'r')
      .getMany()

    return medicos
  }

  async edit(medico_id: any, body: any) {
    const { nombre, a_paterno, a_materno, rfc, cedula } = body
    const medico = await this.repository.findOneOrFail(medico_id)
    medico.nombre = nombre || medico.nombre
    medico.a_materno = a_materno || medico.a_materno
    medico.a_paterno = a_paterno || medico.a_paterno
    medico.cedula = cedula || medico.cedula
    medico.rfc = rfc || medico.rfc

    return await this.repository.save(medico)
  }
}
