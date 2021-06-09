import { Carrera } from '../entities/carrera.entity'
import { getRepository } from 'typeorm'
import {
  ModalidadEnum,
  RolEnum,
  AlertEnum,
  ResultadoEnum,
  RespuestaEnum,
  ModalidadConsultaEnum,
  SolicitudStatusEnum,
} from '../entities'

export async function existCarrer(carrera_id: number): Promise<void> {
  const carrera = await getRepository(Carrera).findOne({
    where: { carrera_id },
  })
  if (!carrera) throw new Error('No existe una carrera con ese id')
}

export function validateModality(modalidad: string): boolean {
  const enumValues = Object.values(ModalidadEnum)
  if (enumValues.includes(modalidad as ModalidadEnum)) return true
  throw new Error(
    'La modalidad solamente puede tomar los valores: ' + enumValues.join(',')
  )
}

export function validateRol(rol: string): boolean {
  const enumValues = Object.values(RolEnum)

  if (!enumValues.includes(rol as RolEnum)) {
    throw new Error(
      'El rol solamente puede tomar los valores: ' + enumValues.join(',')
    )
  }

  return true
}

export function validateAlertStatus(status: string): boolean {
  const enumValues = Object.values(AlertEnum)
  if (enumValues.includes(status as AlertEnum)) return true

  throw new Error(
    'El status solamente puede tomar los valores: ' + enumValues.join(',')
  )
}

export function validateRespuestas(respuestas: Array<string>): boolean {
  const resValues = Object.values(RespuestaEnum)
  respuestas.forEach((res) => {
    if (!resValues.includes(res as RespuestaEnum))
      throw new Error('Las respuestas solo pueden ser: ' + resValues.join(','))
  })
  return true
}

export function validateOrderResult(resultado: string): boolean {
  const enumValues = Object.values(ResultadoEnum)
  if (enumValues.includes(resultado as ResultadoEnum)) return true

  throw new Error(
    'El resultado solamente puede tomar los valores: ' + enumValues.join(',')
  )
}

export function validateModalidadConsulta(modalidad: string): boolean {
  const enumValues = Object.values(ModalidadConsultaEnum)
  if (enumValues.includes(modalidad as ModalidadConsultaEnum)) return true
  throw new Error(
    'La modalidad de la consulta solamente puede tomar los valores: ' +
      enumValues.join(',')
  )
}

export function validateConsultaStatus(status: string): boolean {
  const enumValues = Object.values(SolicitudStatusEnum)
  if (enumValues.includes(status as SolicitudStatusEnum)) return true
  throw new Error(
    'El status de la consulta solamente puede tomar los valores: ' +
      enumValues.join(',')
  )
}
