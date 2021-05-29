import { NextFunction, Request, Response } from 'express'
import { ReportesService } from './reportes.service'

export async function getCasosDetectados(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reportesService = new ReportesService()
    const data = await reportesService.getCasosDetectados()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export async function getTotalCasos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reportesService = new ReportesService()
    const data = await reportesService.getTotalCasos()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export async function getTotalEncuestas(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reportesService = new ReportesService()
    const data = await reportesService.getTotalncuestas()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export async function getTotalConsultas(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reportesService = new ReportesService()
    const data = await reportesService.getTotalConsultas()
    res.json(data)
  } catch (error) {
    next(error)
  }
}
