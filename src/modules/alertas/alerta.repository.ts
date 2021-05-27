import { AbstractRepository, EntityRepository } from 'typeorm'
import { Alerta, AlertEnum } from '../../entities'
import { Usuario } from '../../entities/usuario.entity'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Alerta)
export class AlertaRepository extends AbstractRepository<Alerta> {
  async findAll() {
    const alertas = await this.repository.find({ relations: ['usuario'] })
    return alertas
  }

  async findOne(alerta_id: string) {
    const alert = await this.repository.findOne({
      where: { alerta_id },
      relations: ['usuario'],
    })
    if (!alert) throw new ErrorHandler(404, 'Alerta no encontrada')
    return alert
  }

  async findUserAlerts(usuario_id: string) {
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id }, relations: ['alertas'] })

    return usuario.alertas
  }

  async createAlert(usuario_id: string, alerta: string) {
    const user = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id } })

    const alert = new Alerta()
    alert.alerta = alerta
    alert.usuario = user
    return await this.repository.save(alert)
  }

  async updateAlert(alerta_id: string, body: any) {
    const { alerta, status } = body
    const alert = await this.repository.findOneOrFail({ where: { alerta_id } })
    if (alert.status === AlertEnum.LEIDA)
      throw new ErrorHandler(
        403,
        'No es posible actualizar una alerta que ya ha sido leida'
      )
    alert.alerta = alerta || alert.alerta
    alert.status = status || alert.status
    return await this.repository.save(alert)
  }

  async deleteAlert(alerta_id: string) {
    const alert = await this.repository.findOneOrFail({ where: { alerta_id } })
    return await this.repository.remove(alert)
  }
}
