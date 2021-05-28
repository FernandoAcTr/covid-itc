import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { compile } from '../../helpers/compile_hbs'
import { SolicitudConsultaRepository } from './solicitud.repository'
import pdf from 'html-pdf'

export async function createConsulta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const solicitud = await getCustomRepository(
      SolicitudConsultaRepository
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
    const solicitud = await getCustomRepository(
      SolicitudConsultaRepository
    ).update(req.params.solicitud_id, req.body)
    res.json(solicitud)
  } catch (error) {
    next(error)
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const atendidas = req.query.atendidas
  const consultaRepository = getCustomRepository(SolicitudConsultaRepository)
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
      SolicitudConsultaRepository
    ).findByUser(req.params.usuario_id)
    res.json(solicitudes)
  } catch (error) {
    next(error)
  }
}

export async function findByMedico(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const solicitudes = await getCustomRepository(
      SolicitudConsultaRepository
    ).findByMedico(req.params.medico_id)
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
    const solicitud = await getCustomRepository(
      SolicitudConsultaRepository
    ).delete(req.params.solicitud_id)
    res.json(solicitud)
  } catch (error) {
    next(error)
  }
}

export async function getReceta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pdf = await getCustomRepository(
      SolicitudConsultaRepository
    ).createReceta(req.params.solicitud_id)
    pdf.toStream((err, stream) => {
      if (err) return res.end(err.stack)
      res.setHeader('Content-type', 'application/pdf')
      stream.pipe(res)
    })
  } catch (error) {
    next(error)
  }
}
