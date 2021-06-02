import { AbstractRepository, In } from 'typeorm'
import { Carrera } from '../../entities'
import { EntityRepository } from 'typeorm'
import { ErrorHandler } from '../../middlewares/error_handler'
import { Departamento } from '../../entities/departamento.entity';

@EntityRepository(Carrera)
export class CarreraRepository extends AbstractRepository<Carrera>
{
	async store(body: any)
	{
		const { nombre, departamento_id } = body

		//Create carrera
		const carrera = new Carrera()
		carrera.carrera = nombre
		carrera.departamento = departamento_id

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
		const carreras = await this.manager
			.createQueryBuilder(Carrera, 'e')
			.leftJoinAndSelect('e.departamento', 'p')
			.getMany()

		return carreras
	}

	async update(carrera_id: string, body: any)
	{
		const { nombre, departamento_id } = body

		//find student
		const carrera = await this.repository.findOneOrFail(carrera_id)
		carrera.carrera = nombre || carrera.carrera
		carrera.departamento = departamento_id || carrera.departamento

		return await this.repository.save(carrera)
	}

	async delete(carrera_id: string)
	{
		const carrera = await this.repository.findOneOrFail({ where: { carrera_id } })
		const deleted = await this.repository.remove(carrera)
		return deleted
	 }
}