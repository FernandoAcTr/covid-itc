import pdf from 'html-pdf'
import dateformat from 'dateformat'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { compile } from '../../helpers/compile_hbs'
import { UsuarioRepository } from '../usuario/usuario.repository'
import { ErrorHandler } from '../../middlewares'
import {
  Medico,
  Multimedia,
  SolicitudConsulta,
  SolicitudStatusEnum,
  Usuario,
  Medicamento,
  SolicitudMedicamento,
} from '../../entities'
import {
  deleteFiles,
  transformFilesInMultimedia,
} from '../../helpers/file_storage'

@EntityRepository(SolicitudConsulta)
export class SolicitudConsultaRepository extends AbstractRepository<SolicitudConsulta> {
  async createSolicitud(
    body: any,
    files: Express.Multer.File[]
  ): Promise<SolicitudConsulta> {
    const { usuario_id, sintomas, modalidad } = body

    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id } })

    const solicitud = new SolicitudConsulta()
    solicitud.usuario = usuario
    solicitud.sintomas = sintomas
    solicitud.modalidad = modalidad

    const evidencias: Multimedia[] = transformFilesInMultimedia(files)

    solicitud.evidencias = evidencias

    return await this.repository.save(solicitud)
  }

  async update(solicitud_id: string, body: any): Promise<SolicitudConsulta> {
    const { status, medico_id, fecha_atencion, diagnostico, medicamentos } =
      body
    const solicitud = await this.repository.findOneOrFail({
      where: { solicitud_id },
    })
    if (solicitud.status === SolicitudStatusEnum.ATENDIDA)
      throw new ErrorHandler(
        400,
        'Una cosulta atendida no puede ser modificada'
      )

    //get all ids from medicamentos
    const receta: SolicitudMedicamento[] = []
    if (medicamentos)
      for (const medicamento of medicamentos) {
        const medicamentoDB = await this.manager
          .getRepository(Medicamento)
          .findOneOrFail({
            where: { medicamento_id: medicamento.medicamento_id },
          })
        const relation = new SolicitudMedicamento()
        relation.medicamento = medicamentoDB
        relation.solicitud_consulta = solicitud
        relation.receta = medicamento.receta
        receta.push(relation)
      }

    const medico = await this.manager
      .getRepository(Medico)
      .findOne({ where: { medico_id } })

    solicitud.status = status || solicitud.status
    solicitud.diagnostico = diagnostico || solicitud.diagnostico
    solicitud.fecha_atencion = fecha_atencion || solicitud.fecha_atencion
    solicitud.medico = medico || solicitud.medico
    if (medicamentos) solicitud.medicamentos = receta

    return await this.repository.save(solicitud)
  }

  async findAll(): Promise<SolicitudConsulta[]> {
    return await this.repository.find()
  }

  async findOne(solicitud_id: string): Promise<SolicitudConsulta> {
    const solicitud = await this.repository.findOne({
      where: { solicitud_id },
    })
    if (!solicitud)
      throw new ErrorHandler(404, 'Solicitud de consulta no encontrada')
    return solicitud
  }

  async findAtendidas(): Promise<SolicitudConsulta[]> {
    return await this.repository.find({
      where: { status: SolicitudStatusEnum.ATENDIDA },
    })
  }

  async findPendientes(): Promise<SolicitudConsulta[]> {
    return await this.repository.find({
      where: { status: SolicitudStatusEnum.PENDIENTE },
    })
  }

  async findByUser(usuario_id: string): Promise<SolicitudConsulta[]> {
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id }, relations: ['consultas'] })
    return usuario.consultas
  }

  async findByMedico(medico_id: string): Promise<SolicitudConsulta[]> {
    const medico = await this.manager
      .getRepository(Medico)
      .findOneOrFail({ where: { medico_id }, relations: ['consultas'] })
    return medico.consultas
  }

  async delete(solicitud_id: string): Promise<SolicitudConsulta> {
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

    const { medico, sintomas, medicamentos } = solicitud
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
      medicamentos,
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
