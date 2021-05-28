import { AbstractRepository, EntityRepository } from 'typeorm'
import {
  Medico,
  Multimedia,
  SolicitudConsulta,
  SolicitudStatusEnum,
  Usuario,
} from '../../entities'
import { ErrorHandler } from '../../middlewares'
import { deleteFiles } from '../../helpers/file_storage'
import { compile } from '../../helpers/compile_hbs'
import pdf from 'html-pdf'
import dateformat from 'dateformat'
import { UsuarioRepository } from '../usuario/usuario.repository'

@EntityRepository(SolicitudConsulta)
export class SolicitudConsultaRepository extends AbstractRepository<SolicitudConsulta> {
  async createSolicitud(body: any, files: Express.Multer.File[]) {
    const { usuario_id, sintomas, modalidad } = body

    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id } })

    const solicitud = new SolicitudConsulta()
    solicitud.usuario = usuario
    solicitud.sintomas = sintomas
    solicitud.modalidad = modalidad

    const evidencias: Multimedia[] = []
    if (files)
      for (const file of files) {
        const evidencia = new Multimedia()
        evidencia.url = (file as any).location
        evidencia.public_id = (file as any).key
        evidencias.push(evidencia)
      }

    solicitud.evidencias = evidencias

    console.log(files)

    return await this.repository.save(solicitud)
  }

  async update(solicitud_id: string, body: any) {
    const { status, receta, medico_id, fecha_atencion } = body
    const solicitud = await this.repository.findOneOrFail({
      where: { solicitud_id },
    })
    if (solicitud.status === SolicitudStatusEnum.ATENDIDA)
      throw new ErrorHandler(
        400,
        'Una cosulta atendida no puede ser modificada'
      )
    const medico = await this.manager
      .getRepository(Medico)
      .findOne({ where: { medico_id } })
    solicitud.status = status || solicitud.status
    solicitud.receta = receta || solicitud.receta
    solicitud.fecha_atencion = fecha_atencion || solicitud.fecha_atencion
    solicitud.medico = medico || solicitud.medico
    return await this.repository.save(solicitud)
  }

  async findAll() {
    return await this.repository.find()
  }

  async findAtendidas() {
    return await this.repository.find({
      where: { status: SolicitudStatusEnum.ATENDIDA },
    })
  }

  async findPendientes() {
    return await this.repository.find({
      where: { status: SolicitudStatusEnum.PENDIENTE },
    })
  }

  async findByUser(usuario_id: string) {
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id }, relations: ['consultas'] })
    return usuario.consultas
  }

  async findByMedico(medico_id: string) {
    const medico = await this.manager
      .getRepository(Medico)
      .findOneOrFail({ where: { medico_id }, relations: ['consultas'] })
    return medico.consultas
  }

  async delete(solicitud_id: string) {
    const solicitud = await this.repository.findOneOrFail({
      where: { solicitud_id },
    })
    if (solicitud.status === SolicitudStatusEnum.ATENDIDA)
      throw new ErrorHandler(403, 'Una cosulta atendida no puede ser eliminada')
    deleteFiles(solicitud.evidencias)
    return await this.repository.remove(solicitud)
  }

  async createReceta(solicitud_id: string): Promise<pdf.CreateResult> {
    const solicitud = await this.repository.findOne({
      where: { solicitud_id },
    })
    if (!solicitud) throw new ErrorHandler(404, 'Receta no encontrada')
    if (solicitud.status === SolicitudStatusEnum.PENDIENTE)
      throw new ErrorHandler(400, 'La solicitud aun no ha sido atendida')

    const usuario = await this.manager
      .getCustomRepository(UsuarioRepository)
      .findOne(solicitud.usuario.usuario_id)

    const { medico, receta, sintomas } = solicitud
    const paciente = usuario.personal || usuario.estudiante

    const data = {
      medico: {
        nombre: `${medico.nombre} ${medico.a_paterno} ${medico.a_materno}`,
        cedula: medico.cedula,
      },
      paciente: {
        nombre: `${paciente.nombre} ${paciente.a_paterno} ${paciente.a_materno}`,
      },
      sintomas,
      receta,
      fecha: dateformat(solicitud.fecha_atencion, 'dd-mm-yyyy'),
    }

    const html = compile('receta.hbs', data)

    return pdf.create(html, {
      width: '20cm',
      height: '13cm',
      border: { left: '2cm', right: '2cm', top: '1cm', bottom: '2cm' },
      header: { height: '20mm' },
    })
  }
}
