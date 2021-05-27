import { AbstractRepository, EntityRepository } from 'typeorm'
import { In } from 'typeorm'
import { Departamento, Personal, Rol, RolEnum, Usuario } from '../../entities'
import { requireSurvey } from '../../helpers/require_surver.helper'
import { UsuarioRepository } from '../usuario/usuario'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Personal)
export class PersonalRepository extends AbstractRepository<Personal> {
  async store(body: any) {
    const {
      nombre,
      a_paterno,
      a_materno,
      departamento_id,
      rfc,
      email,
      password,
    } = body

    const userRepository = this.manager.getCustomRepository(UsuarioRepository)

    // Create user Role
    const userRol = await this.manager.getRepository(Rol).findOneOrFail({
      where: { rol: In([RolEnum.PERSONAL]) },
    })

    //create user
    const usuario = new Usuario()
    usuario.email = email
    usuario.password = userRepository.encrypPassword(password)
    usuario.roles = [userRol]
    usuario.requireSurvey = await requireSurvey()

    //find department
    const departamento = await this.manager
      .getRepository(Departamento)
      .findOneOrFail(departamento_id)

    //create personal
    const personal = new Personal()
    personal.nombre = nombre
    personal.a_materno = a_materno
    personal.a_paterno = a_paterno
    personal.usuario = usuario
    personal.rfc = rfc
    personal.departamento = departamento

    return await this.repository.save(personal)
  }

  async findAll() {
    const personal = await this.manager
      .createQueryBuilder(Personal, 'p')
      .leftJoinAndSelect('p.usuario', 'u')
      .leftJoinAndSelect('p.departamento', 'd')
      .leftJoinAndSelect('u.roles', 'r')
      .getMany()

    return personal
  }

  async findOne(personal_id: string) {
    const personal = await this.repository.findOne(personal_id, {
      relations: ['usuario'],
    })

    if (!personal)
      throw new ErrorHandler(
        404,
        'No esiste ningun personal con id ' + personal_id
      )

    return personal
  }

  async edit(personal_id: string, body: any) {
    const { nombre, a_paterno, a_materno, departamento_id, rfc } = body

    //find departament
    const departamento = await this.manager
      .getRepository(Departamento)
      .findOne({
        where: { departamento_id },
      })

    //find personal
    const personal = await this.repository.findOneOrFail(personal_id)
    personal.nombre = nombre || personal.nombre
    personal.a_materno = a_materno || personal.a_materno
    personal.a_paterno = a_paterno || personal.a_paterno
    personal.departamento = departamento || personal.departamento
    personal.rfc = rfc || personal.rfc

    return await this.repository.save(personal)
  }
}
