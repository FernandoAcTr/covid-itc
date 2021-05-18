import { Carrera } from '../entities/carrera.entity'
import { getRepository } from 'typeorm'
import { ModalidadEnum } from '../entities'

export async function existCarrer(carrera_id: any) {
  const carrera = await getRepository(Carrera).findOne(carrera_id)
  if (!carrera) throw new Error('No existe una carrera con ese id')
}

export function validateModality(modalidad: string) {
  for (const value of Object.values(ModalidadEnum)) {
    if(modalidad === value) return true
  }
  throw new Error('La modalidad solamente puede tomar los valores: obligatoria, voluntaria y aleatoria')
}
