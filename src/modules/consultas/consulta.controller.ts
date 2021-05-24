import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ConsultaRepository } from './consulta.repository'

export async function createConsulta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const solicitud = await getCustomRepository(
      ConsultaRepository
    ).createSolicitud(req.body, (req.files as any)['evidencias'])
    res.json(solicitud)
  } catch (error) {
    next(error)
  }
}

export async function updateConsulta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const solicitud = await getCustomRepository(ConsultaRepository).update(
      req.params.solicitud_id,
      req.body
    )
    res.json(solicitud)
  } catch (error) {
    next(error)
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const atendidas = req.query.atendidas
  const consultaRepository = getCustomRepository(ConsultaRepository)
  try {
    let solicitudes
    if (atendidas === undefined)
      solicitudes = await consultaRepository.findAll()
    else if (Number(atendidas))
      solicitudes = await consultaRepository.findAtendidas()
    else if (!Number(atendidas))
      solicitudes = await consultaRepository.findPendientes()

    res.json(solicitudes)
  } catch (error) {
    next(error)
  }
}

export async function findByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const solicitudes = await getCustomRepository(
      ConsultaRepository
    ).findByUser(req.params.usuario_id)
    res.json(solicitudes)
  } catch (error) {
    next(error)
  }
}

export async function deleteConsulta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const solicitud = await getCustomRepository(ConsultaRepository).delete(
      req.params.solicitud_id
    )
    res.json(solicitud)
  } catch (error) {
    next(error)
  }
}
