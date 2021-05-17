import { Carrera } from '../entities/carrera.entity'
import { getRepository } from 'typeorm'

export async function existCarrer(carrera_id: any) {
  const carrera = await getRepository(Carrera).findOne(carrera_id)
  if (!carrera) throw new Error('No existe una carrera con ese id')
}
