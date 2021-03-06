import { AbstractRepository, Equal, EntityRepository } from 'typeorm'
import { Carrera, Estudiante, Rol, RolEnum, Usuario } from '../../entities'
import { requireSurvey } from '../../helpers/require_surver.helper'
import { UsuarioRepository } from '../usuario/usuario.repository'
import { ErrorHandler } from '../../middlewares'

@EntityRepository(Estudiante)
export class StudentRepository extends AbstractRepository<Estudiante> {
  async store(body: any): Promise<Estudiante> {
    const { nombre, a_paterno, a_materno, carrera_id, email, password } = body
    const userRepository = this.manager.getCustomRepository(UsuarioRepository)

    // Create user Role
    const userRol = await this.manager.getRepository(Rol).findOneOrFail({
      where: { rol: Equal(RolEnum.ESTUDIANTE) },
    })

    console.log(userRol)

    //create user
    const usuario = new Usuario()
    usuario.email = email
    usuario.password = userRepository.encrypPassword(password)
    usuario.rol = userRol
    usuario.requireSurvey = await requireSurvey()

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

  async findOne(estudiante_id: string): Promise<Estudiante> {
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

  async findAll(): Promise<Estudiante[]> {
    const estudiantes = await this.manager
      .createQueryBuilder(Estudiante, 'e')
      .leftJoinAndSelect('e.usuario', 'u')
      .leftJoinAndSelect('e.carrera', 'c')
      .leftJoinAndSelect('u.rol', 'r')
      .getMany()

    return estudiantes
  }

  async update(estudiante_id: string, body: any): Promise<Estudiante> {
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
