import { AbstractRepository, EntityRepository } from 'typeorm'
import { ErrorHandler } from '../../middlewares'
import { ModalidadEncuesta, ModalidadEnum } from '../../entities'

@EntityRepository(ModalidadEncuesta)
export class ModalidadEncuestaRepository extends AbstractRepository<ModalidadEncuesta> {
  async getModality(): Promise<ModalidadEncuesta> {
    const modalidad = await this.repository.find({
      order: { id: 'DESC' },
      take: 1,
    })

    if (!modalidad[0])
      throw new ErrorHandler(404, 'La modalidad aun no ha sido establecida')

    return modalidad[0] || null
  }

  async setModality(modality: ModalidadEnum): Promise<ModalidadEncuesta> {
    const sql = {
      [ModalidadEnum.ALEATORIA]:
        'update usuario set require_survey=true where random() > 0.5',
      [ModalidadEnum.OBLIGATORIA]: 'update usuario set require_survey=true',
      [ModalidadEnum.VOLUNTARIA]: 'update usuario set require_survey=false',
    }
    const query = sql[modality]

    const saved = await this.manager.transaction(
      async (entityManager): Promise<ModalidadEncuesta> => {
        const newModalidad = new ModalidadEncuesta()
        newModalidad.modalidad = modality
        const saved = await entityManager.save(newModalidad)

        await entityManager.query('update usuario set require_survey=false')
        await entityManager.query(query)
        return saved
      }
    )

    return saved
  }
}
