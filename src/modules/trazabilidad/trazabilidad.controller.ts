import dateformat from 'dateformat'
import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { TrazabilidadRepository } from './trazabilidad.repository'
import { compile } from '../../helpers/compile_hbs'
import { sendMail } from '../../libs/mailer'
import { settings } from '../../config/settings'
const { EMAIL_CREDENTIALS } = settings

export async function getTrazability(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const trazabilidad = await getCustomRepository(
      TrazabilidadRepository
    ).getTrazabilidad(req.params.usuario_id)
    res.json(trazabilidad)
  } catch (error) {
    next(error)
  }
}

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const trazos = await getCustomRepository(TrazabilidadRepository).findAll()
    res.json(trazos)
  } catch (error) {
    next(error)
  }
}

export async function addContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const trazabilidad = await getCustomRepository(
      TrazabilidadRepository
    ).addContact(req.body)

    const email = compile('alerta.hbs', {
      fecha: dateformat(Date.now(), 'dd-mm-yyyy'),
      alerta: "Una persona con la que ha estado en contacto se encuentra contagiada de COVID-19, le recomendamos ir al medico a realizarse una prueba.",
      departamento: 'Departamento Médico',
    })
    sendMail(
      EMAIL_CREDENTIALS.EMAIL!,
      trazabilidad.contacto.email,
      'Ha recibido una nueva alerta',
      email
    )

    res.json(trazabilidad)
  } catch (error) {
    next(error)
  }
}

export async function deleteContact(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const deleted = await getCustomRepository(
      TrazabilidadRepository
    ).deleteContact(Number(req.params.trazabilidad_id))
    res.json(deleted)
  } catch (error) {
    next(error)
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updated = await getCustomRepository(TrazabilidadRepository).update(
      Number(req.params.trazabilidad_id),
      req.body
    )
    res.json(updated)
  } catch (error) {
    next(error)
  }
}
