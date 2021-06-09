import { AbstractRepository, EntityRepository } from 'typeorm'
import { Medicamento } from '../../entities'
import { ErrorHandler } from '../../middlewares'

@EntityRepository(Medicamento)
export class MedicamentoRepository extends AbstractRepository<Medicamento> {
  async findOne(medicamento_id: string): Promise<Medicamento> {
    const medicamento = await this.repository.findOne({
      where: { medicamento_id },
    })
    if (!medicamento) throw new ErrorHandler(404, 'Medicamento no encontrado')
    return medicamento
  }

  async findAll(): Promise<Medicamento[]> {
    return await this.repository.find()
  }

  async store(descripcion: string): Promise<Medicamento> {
    const medicamento = new Medicamento()
    medicamento.descripcion = descripcion
    return await this.repository.save(medicamento)
  }

  async delete(medicamento_id: string): Promise<Medicamento> {
    const medicamento = await this.repository.findOneOrFail({
      where: { medicamento_id },
    })

    return await this.repository.remove(medicamento)
  }

  async update(
    medicamento_id: string,
    descripcion: string
  ): Promise<Medicamento> {
    const medicamento = await this.repository.findOneOrFail({
      where: { medicamento_id },
    })
    medicamento.descripcion = descripcion
    return await this.repository.save(medicamento)
  }
}
