import { getRepository } from 'typeorm'
import { ModalidadEncuesta, ModalidadEnum } from '../entities'

//TODO cambiar la manera en que se lee la modalidad
export async function requireSurvey() {
  const posibilidades = {
    [ModalidadEnum.ALEATORIA]: () => Math.random() > 0.5,
    [ModalidadEnum.OBLIGATORIA]: () => true,
    [ModalidadEnum.VOLUNTARIA]: () => false,
  }

  const modalidad = await getRepository(ModalidadEncuesta).find({
    order: { id: 'DESC' },
    take: 1,
  })
  if (modalidad.length === 0) return false

  const data = modalidad[0].modalidad
  const fun = posibilidades[data as ModalidadEnum]
  return fun()
}
