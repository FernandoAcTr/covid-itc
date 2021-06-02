import { EntityRepository, AbstractRepository } from 'typeorm'
import { Medico, OrdenDePrueba, TipoPrueba, Usuario } from '../../entities'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(OrdenDePrueba)
export class OrdenRepository extends AbstractRepository<OrdenDePrueba> {
  async createOrder(body: any) {
    const { usuario_id, medico_id, tipo_id } = body

    const tipoPrueba = await this.manager
      .getRepository(TipoPrueba)
      .findOneOrFail({ where: { tipo_id } })

    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id } })

    const medico = await this.manager
      .getRepository(Medico)
      .findOneOrFail({ where: { medico_id } })

    const orden = new OrdenDePrueba()
    orden.medico = medico
    orden.usuario = usuario
    orden.tipo = tipoPrueba

    return await this.repository.save(orden)
  }

  async findOne(orden_id: string) {
    const orden = await this.repository.findOne({ where: { orden_id } })
    if (!orden) throw new ErrorHandler(404, 'Orden no encontrada')

    return orden
  }

  async findAll() {
    return await this.repository.find()
  }

  async findByUser(usuario_id: string) {
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id }, relations: ['ordenes'] })
    return usuario.ordenes
  }

  async deleteOrden(orden_id: string) {
    const orden = await this.repository.findOneOrFail({ where: { orden_id } })
    const deleted = await this.repository.remove(orden)
    return deleted
  }

  async update(orden_id: string, body: any) {
    const { resultado, tipo_id, fecha_deteccion } = body

    const orden = await this.repository.findOneOrFail({ where: { orden_id } })
    const tipoPrueba = await this.manager
      .getRepository(TipoPrueba)
      .findOne({ where: { tipo_id } })

    orden.tipo = tipoPrueba || orden.tipo
    orden.resultado = resultado || orden.resultado
    orden.fecha_deteccion = fecha_deteccion || orden.fecha_deteccion

    return await this.repository.save(orden)
  }
}
