import pdf from 'html-pdf'
import { EntityRepository, AbstractRepository } from 'typeorm'
import { Medico, OrdenDePrueba, TipoPrueba, Usuario } from '../../entities'
import { compile } from '../../helpers/compile_hbs'
import { ErrorHandler } from '../../middlewares'
import { UsuarioRepository } from '../usuario/usuario.repository'
import dateformat from 'dateformat'

@EntityRepository(OrdenDePrueba)
export class OrdenRepository extends AbstractRepository<OrdenDePrueba> {
  async createOrder(body: any): Promise<OrdenDePrueba> {
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

  async findOne(orden_id: string): Promise<OrdenDePrueba> {
    const orden = await this.repository.findOne({ where: { orden_id } })
    if (!orden) throw new ErrorHandler(404, 'Orden no encontrada')

    return orden
  }

  async findAll(): Promise<OrdenDePrueba[]> {
    return await this.repository.find()
  }

  async findByUser(usuario_id: string): Promise<OrdenDePrueba[]> {
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id }, relations: ['ordenes'] })
    return usuario.ordenes
  }

  async deleteOrden(orden_id: string): Promise<OrdenDePrueba> {
    const orden = await this.repository.findOneOrFail({ where: { orden_id } })
    const deleted = await this.repository.remove(orden)
    return deleted
  }

  async update(orden_id: string, body: any): Promise<OrdenDePrueba> {
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

  async createOrdenPDF(orden_id: string): Promise<pdf.CreateResult> {
    const orden = await this.repository.findOne({
      where: { orden_id },
    })
    if (!orden) throw new ErrorHandler(404, 'Receta no encontrada')

    const usuario = await this.manager
      .getCustomRepository(UsuarioRepository)
      .findOne(orden.usuario.usuario_id)
    const paciente = usuario.personal || usuario.estudiante

    console.log(orden)

    const data = {
      medico: {
        nombre: `${orden.medico.nombre} ${orden.medico.a_paterno} ${orden.medico.a_materno}`,
        cedula: orden.medico.cedula,
      },
      paciente: {
        nombre: `${paciente.nombre} ${paciente.a_paterno} ${paciente.a_materno}`,
      },
      fecha: dateformat(orden.create_at, 'dd-mm-yyyy'),
      tipo: orden.tipo.descripcion,
    }

    const html = compile('orden.hbs', data)

    return pdf.create(html, {
      width: '20cm',
      height: '15cm',
      border: { left: '2cm', right: '2cm', top: '1cm', bottom: '2cm' },
      header: { height: '20mm' },
      footer: { height: '28mm' },
    })
  }
}
