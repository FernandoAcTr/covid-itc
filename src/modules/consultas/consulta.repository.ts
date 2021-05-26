import { AbstractRepository, EntityRepository } from 'typeorm'
import {
  Medico,
  Multimedia,
  SolicitudConsulta,
  StatusEnum,
  Usuario,
} from '../../entities'
import { ErrorHandler } from '../../middlewares/error_handler'
import { deleteFiles } from '../../helpers/file_storage'

@EntityRepository(SolicitudConsulta)
export class ConsultaRepository extends AbstractRepository<SolicitudConsulta> {
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
    if (solicitud.status === StatusEnum.ATENDIDA)
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
      where: { status: StatusEnum.ATENDIDA },
    })
  }

  async findPendientes() {
    return await this.repository.find({
      where: { status: StatusEnum.PENDIENTE },
    })
  }

  async findByUser(usuario_id: string) {
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id }, relations: ['consultas'] })
    return usuario.consultas
  }

  async delete(solicitud_id: string) {
    const solicitud = await this.repository.findOneOrFail({
      where: { solicitud_id },
    })
    if (solicitud.status === StatusEnum.ATENDIDA)
      throw new ErrorHandler(403, 'Una cosulta atendida no puede ser eliminada')
    deleteFiles(solicitud.evidencias)
    return await this.repository.remove(solicitud)
  }
}
