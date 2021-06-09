import { AbstractRepository, EntityRepository } from 'typeorm'
import { Carrera, Departamento } from '../../entities'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Carrera)
export class CarreraRepository extends AbstractRepository<Carrera> {
  async store(body: any): Promise<Carrera> {
    const { nombre, departamento_id } = body

    //find department
    const departamento = await this.manager
      .getRepository(Departamento)
      .findOneOrFail({ where: { departamento_id } })

    const carrera = new Carrera()
    carrera.carrera = nombre
    carrera.departamento = departamento

    return await this.repository.save(carrera)
  }

  async findOne(carrera_id: string): Promise<Carrera> {
    const carrera = await this.repository.findOne({ where: { carrera_id } })

    if (!carrera)
      throw new ErrorHandler(404, 'No existe la carrera con id ' + carrera_id)

    return carrera
  }

  async findAll(): Promise<Carrera[]> {
    const carreras = await this.repository.find()
    return carreras
  }

  async update(carrera_id: string, body: any): Promise<Carrera> {
    const { nombre, departamento_id } = body

    //find department
    const departamento = await this.manager
      .getRepository(Departamento)
      .findOne({ where: { departamento_id } })

    const carrera = await this.repository.findOneOrFail({
      where: { carrera_id },
    })
    carrera.carrera = nombre || carrera.carrera
    carrera.departamento = departamento || carrera.departamento

    return await this.repository.save(carrera)
  }

  async delete(carrera_id: string): Promise<Carrera> {
    const carrera = await this.repository.findOneOrFail({
      where: { carrera_id },
    })
    const deleted = await this.repository.remove(carrera)
    return deleted
  }
}
