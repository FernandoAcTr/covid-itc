import { AbstractRepository, In } from 'typeorm'
import { Departamento } from '../../entities'
import { EntityRepository } from 'typeorm'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Departamento)
export class DepartamentoRepository extends AbstractRepository<Departamento>
{
	async store(body: any)
	{
		const { nombre } = body

		const departamento = new Departamento()
		departamento.departamento = nombre

		return await this.repository.save(departamento)
	}

	async findOne(departamento_id: string)
	{
		const departamento = await this.repository.findOne(departamento_id)

		if (!departamento)
			throw new ErrorHandler(
				404,
				'No existe la carrera con id ' + departamento_id
			)

		return departamento
	}

	async findAll() {
		const departamentos = await this.manager
			.createQueryBuilder(Departamento, 'e')
			.getMany()

		return departamentos
	}

	async update(departamento_id: string, body: any)
	{
		const { nombre } = body

		const departamento = await this.repository.findOneOrFail(departamento_id)
		departamento.departamento = nombre || departamento.departamento

		return await this.repository.save(departamento)
	}

	async delete(departamento_id: string)
	{
		const departamento = await this.repository.findOneOrFail({ where: { departamento_id } })
		const deleted = await this.repository.remove(departamento)
		return deleted
	 }
}