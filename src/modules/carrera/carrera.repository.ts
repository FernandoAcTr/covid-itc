import { AbstractRepository, In } from 'typeorm'
import { Carrera } from '../../entities'
import { EntityRepository } from 'typeorm'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Carrera)
export class CarreraRepository extends AbstractRepository<Carrera>
{
	async store(body: any)
	{
		const { nombre } = body

		//Create carrera
		const carrera = new Carrera()
		carrera.carrera = nombre

		return await this.repository.save(carrera)
	}

	async findOne(carrera_id: string)
	{
		const carrera = await this.repository.findOne(carrera_id)

		if (!carrera)
			throw new ErrorHandler(
				404,
				'No existe la carrera con id ' + carrera_id
			)

		return carrera
	}

	async findAll() {
		const estudiantes = await this.manager
			.createQueryBuilder(Carrera, 'e')
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
		estudiante.carrera = nombre || estudiante.carrera

		return await this.repository.save(estudiante)
	}
}
