import { Carrera } from '../entities/carrera.entity'
import { getRepository } from 'typeorm'
import { ModalidadEnum, RolEnum } from '../entities'

export async function existCarrer(carrera_id: any) {
  const carrera = await getRepository(Carrera).findOne(carrera_id)
  if (!carrera) throw new Error('No existe una carrera con ese id')
}

export function validateModality(modalidad: string) {
  const enumValues = Object.values(ModalidadEnum)
  if (enumValues.includes(modalidad as ModalidadEnum)) return true
  throw new Error(
    'La modalidad solamente puede tomar los valores: ' + enumValues.join(',')
  )
}

export function validateRoles(roles: string[]) {
  const enumValues = Object.values(RolEnum)

  for (const rol of roles) {
    if (!enumValues.includes(rol as RolEnum)) {
      throw new Error(
        'Los roles solamente puede tomar los valores: ' + enumValues.join(',')
      )
    }
  }

  return true
}
