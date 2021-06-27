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

  async findAll(): Promise<any[]> {
    // return await this.repository.find()
    const sql = `
    select 
      trazabilidad_id, 
      fecha, 
      avisado, 
      t.usuario_id,
      t.contacto as contacto_id,
      u.email as usuario_email,
      concat_ws(
        ' ',
        coalesce(e.nombre, p.nombre, m.nombre),
        coalesce(e.a_paterno, p.a_paterno, m.a_paterno),
        coalesce(e.a_materno, p.a_materno, m.a_materno)
      ) as usuario,
      concat_ws(
        ' ',
        coalesce(e_c.nombre, p_c.nombre, m_c.nombre),
        coalesce(e_c.a_paterno, p_c.a_paterno, m_c.a_paterno),
        coalesce(e_c.a_materno, p_c.a_materno, m_c.a_materno)
      ) as contacto
    from trazabilidad t
      left join estudiante e on t.usuario_id = e.usuario_id	
      left join medico m on t.usuario_id = m.usuario_id	
      left join personal p on t.usuario_id = p.usuario_id 
      left join estudiante e_c on t.contacto = e_c.usuario_id	
      left join medico m_c on t.contacto = m_c.usuario_id	
      left join personal p_c on t.contacto = p_c.usuario_id
      left join usuario u on t.usuario_id = u.usuario_id;  
    `
    const resp = await this.manager.query(sql)
    console.log(resp)
    return resp
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
