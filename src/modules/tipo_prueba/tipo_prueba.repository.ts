import { AbstractRepository, EntityRepository } from 'typeorm'
import { TipoPrueba } from '../../entities'

@EntityRepository(TipoPrueba)
export class TipoPruebaRepository extends AbstractRepository<TipoPrueba> {
  async store(descripcion: string): Promise<TipoPrueba> {
    const newTipo = new TipoPrueba()
    newTipo.descripcion = descripcion
    return await this.repository.save(newTipo)
  }

  async findOne(tipo_id: number): Promise<TipoPrueba> {
    return await this.repository.findOneOrFail({ where: { tipo_id } })
  }

  async findAll(): Promise<TipoPrueba[]> {
    return await this.repository.find()
  }

  async update(tipo_id: number, descripcion: string): Promise<TipoPrueba> {
    const tipo = await this.repository.findOneOrFail({ where: { tipo_id } })
    tipo.descripcion = descripcion
    return await this.repository.save(tipo)
  }

  async deleteTipo(tipo_id: number): Promise<TipoPrueba> {
    const tipo = await this.repository.findOneOrFail({ where: { tipo_id } })
    return await this.repository.remove(tipo)
  }
}
