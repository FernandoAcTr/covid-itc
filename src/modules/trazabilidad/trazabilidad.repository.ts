import { EntityRepository, AbstractRepository } from 'typeorm'
import { Trazabilidad } from '../../entities/trazabilidad.entity'
import { Usuario } from '../../entities/usuario.entity'
import { ErrorHandler } from '../../middlewares'

@EntityRepository(Trazabilidad)
export class TrazabilidadRepository extends AbstractRepository<Trazabilidad> {
  async getTrazabilidad(usuario_id: string): Promise<Trazabilidad[]> {
    const usuario = await this.manager.getRepository(Usuario).findOne({
      where: { usuario_id },
      relations: ['trazabilidad'],
    })
    if (!usuario) throw new ErrorHandler(404, 'Usuario no encontrado')
    return usuario.trazabilidad
  }

  async findAll(): Promise<Trazabilidad[]> {
    return await this.repository.find()
  }

  async addContact(body: any): Promise<Trazabilidad> {
    const { usuario_id, contacto_id, fecha } = body

    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id }, select: ['usuario_id', 'email'] })

    const contacto = await this.manager.getRepository(Usuario).findOneOrFail({
      where: { usuario_id: contacto_id },
      select: ['usuario_id', 'email'],
    })

    const trazabilidad = new Trazabilidad()
    trazabilidad.usuario = usuario
    trazabilidad.contacto = contacto
    trazabilidad.fecha = fecha
    return await this.repository.save(trazabilidad)
  }

  async deleteContact(trazabilidad_id: number): Promise<Trazabilidad> {
    const trazabilidad = await this.repository.findOneOrFail({
      where: { trazabilidad_id },
    })
    return await this.repository.remove(trazabilidad)
  }

  async update(trazabilidad_id: number, body: any): Promise<Trazabilidad> {
    const { avisado } = body
    const trazabilidad = await this.repository.findOneOrFail({
      where: { trazabilidad_id },
    })
    trazabilidad.avisado = avisado || trazabilidad.avisado
    return await this.repository.save(trazabilidad)
  }
}
