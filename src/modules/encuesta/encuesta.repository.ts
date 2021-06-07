import { AbstractRepository, EntityRepository } from 'typeorm'
import {
  Encuesta,
  Pregunta,
  Respuesta,
  Usuario,
  RespuestaEnum,
} from '../../entities'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Encuesta)
export class EncuestaRepository extends AbstractRepository<Encuesta> {
  async createEncuesta(body: any): Promise<Encuesta> {
    const { usuario_id, otros_sintomas, respuestas } = body

    // Find user
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id } })
    usuario.requireSurvey = false

    //create encuesta
    const encuesta = new Encuesta()

    //create respuestas
    const respuestasList: Respuesta[] = []
    const preguntas = await this.manager.getRepository(Pregunta).find()

    if (preguntas.length === 0)
      throw new ErrorHandler(500, 'Las preguntas aun no son definidas')

    if (preguntas.length !== respuestas.length)
      throw new ErrorHandler(
        500,
        'El numero de preguntas no coincide con el numero de respuestas'
      )

    respuestas.forEach((r: any, i: number) => {
      const newRespuesta = new Respuesta()
      const pregunta = preguntas[i]
      newRespuesta.pregunta = pregunta
      newRespuesta.respuesta = r
      respuestasList.push(newRespuesta)
    })

    encuesta.respuestas = respuestasList
    encuesta.otros_sintomas = otros_sintomas
    encuesta.usuario = usuario

    const result = await this.manager.transaction(async (entityManager) => {
      await entityManager.save(usuario)
      return await entityManager.save(encuesta)
    })
    return result
  }

  async findOne(encuesta_id: number) {
    const encuesta = await this.repository.findOneOrFail({
      where: { encuesta_id },
      relations: ['usuario', 'respuestas'],
    })
    return encuesta
  }

  async getPreguntas() {
    return await this.manager.getRepository(Pregunta).find()
  }

  async findAllByUserId(usuario_id: string) {
    const usuario = await this.manager.getRepository(Usuario).findOneOrFail({
      where: { usuario_id },
      relations: ['encuestas', 'encuestas.respuestas'],
    })

    return usuario.encuestas
  }

  async findAll() {
    const encuestas = await this.manager
      .getRepository(Encuesta)
      .find({ relations: ['usuario'] })

    return encuestas
  }

  async findAllWithSymtoms() {
    const result = await this.manager
      .getRepository(Encuesta)
      .find({ relations: ['usuario', 'respuestas'] })

    const encuestas: Encuesta[] = []

    result.map((e) => {
      if (e.respuestas.some((s) => s.respuesta === RespuestaEnum.SI)) {
        delete (e as any).respuestas
        encuestas.push(e)
      }
    })

    return encuestas
  }
}
