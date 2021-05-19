import { AbstractRepository, In } from 'typeorm'
import { Carrera, Estudiante, Rol, RolEnum, Usuario } from '../../entities'
import { requireSurvey } from '../../helpers/require_surver.helper'
import { UserRepository } from '../user/user.repository'
import { EntityRepository } from 'typeorm'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Estudiante)
export class StudentRepository extends AbstractRepository<Estudiante> {
  async storeStudent(body: any) {
    const { nombre, a_paterno, a_materno, carrera_id, email, password } = body
    const userRepository = this.manager.getCustomRepository(UserRepository)

    // Create user Role
    const userRol = await this.manager.getRepository(Rol).findOneOrFail({
      where: { rol: In([RolEnum.ESTUDIANTE]) },
    })

    //create user
    const usuario = new Usuario()
    usuario.email = email
    usuario.password = userRepository.encrypPassword(password)
    usuario.roles = [userRol]
    usuario.requireSuvey = await requireSurvey()

    //find carrer
    const carrera = await this.manager
      .getRepository(Carrera)
      .findOneOrFail(carrera_id)

    //create student
    const estudiante = new Estudiante()
    estudiante.nombre = nombre
    estudiante.a_materno = a_materno
    estudiante.a_paterno = a_paterno
    estudiante.usuario = usuario
    estudiante.carrera = carrera

    return await this.repository.save(estudiante)
  }

  async findOne(estudiante_id: string) {
    const estudiante = await this.repository.findOne(estudiante_id, {
      relations: ['usuario'],
    })

    if (!estudiante)
      throw new ErrorHandler(
        404,
        'No existe el estudiante con id ' + estudiante_id
      )

    return estudiante
  }

  async findAll() {
    const estudiantes = await this.manager
      .createQueryBuilder(Estudiante, 'e')
      .leftJoinAndSelect('e.usuario', 'u')
      .leftJoinAndSelect('e.carrera', 'c')
      .leftJoinAndSelect('u.roles', 'r')
      .getMany()

    return estudiantes
  }

  async update(estudiante_id: string, body: any) {
    const { nombre, a_paterno, a_materno, carrera_id } = body

    //find carrer
    const carrera = await this.manager.getRepository(Carrera).findOne({
      where: { carrera_id },
    })

    //find student
    const estudiante = await this.repository.findOneOrFail(estudiante_id)
    estudiante.nombre = nombre || estudiante.nombre
    estudiante.a_materno = a_materno || estudiante.a_materno
    estudiante.a_paterno = a_paterno || estudiante.a_paterno
    estudiante.carrera = carrera || estudiante.carrera

    return await this.repository.save(estudiante)
  }
}
