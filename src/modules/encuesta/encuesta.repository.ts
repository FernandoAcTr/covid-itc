import { AbstractRepository, EntityRepository } from 'typeorm'
import { Encuesta, Pregunta, Respuesta, Usuario } from '../../entities'
import { ErrorHandler } from '../../middlewares/error_handler'

@EntityRepository(Encuesta)
export class EncuestaRepository extends AbstractRepository<Encuesta> {
  async createEncuesta(body: any): Promise<Encuesta> {
    const { usuario_id, otros_sintomas, respuestas } = body

    // Find user
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id } })

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

    return await this.repository.save(encuesta)
  }

  async findOne(encuesta_id: number) {
    const encuesta = await this.repository.findOneOrFail({
      where: { encuesta_id },
      relations: ['usuario'],
    })
    return encuesta
  }

  async getPreguntas() {
    return await this.manager.getRepository(Pregunta).find()
  }

  async findAllByUserId(usuario_id: string) {
    const usuario = await this.manager
      .getRepository(Usuario)
      .findOneOrFail({ where: { usuario_id }, relations: ['encuestas'] })

    return usuario.encuestas
  }

  async findAll() {
    return await this.manager
      .getRepository(Encuesta)
      .find({ relations: ['usuario'] })
  }
}
