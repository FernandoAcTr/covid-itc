import { AbstractRepository, EntityRepository } from 'typeorm'
import { Medicamento } from '../../entities'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Medicamento)
export class MedicamentoRepository extends AbstractRepository<Medicamento> {
  async findOne(medicamento_id: string) {
    const medicamento = await this.repository.findOne({
      where: { medicamento_id },
    })
    if (!medicamento) throw new ErrorHandler(404, 'Medicamento no encontrado')
    return medicamento
  }

  async findAll() {
    return await this.repository.find()
  }

  async store(descripcion: string) {
    const medicamento = new Medicamento()
    medicamento.descripcion = descripcion
    return await this.repository.save(medicamento)
  }

  async delete(medicamento_id: string) {
    const medicamento = await this.repository.findOneOrFail({
      where: { medicamento_id },
    })

    return await this.repository.remove(medicamento)
  }

  async update(medicamento_id: string, descripcion: string) {
    const medicamento = await this.repository.findOneOrFail({
      where: { medicamento_id },
    })
    medicamento.descripcion = descripcion
    return await this.repository.save(medicamento)
  }
}
