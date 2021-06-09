import { NextFunction, Request, Response } from 'express'
import { ReportesService } from './reportes.service'

export async function getCasosDetectados(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const reportesService = new ReportesService()
    const data = await reportesService.getCasosDetectados()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export async function getCasosDetectadosPDF(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const reportesService = new ReportesService()
    const pdf = await reportesService.getCasosDetectadosPDF()
    pdf.toStream((err, stream) => {
      if (err) return next(err)
      res.setHeader('Content-type', 'application/pdf')
      stream.pipe(res)
    })
  } catch (error) {
    next(error)
  }
}

export async function getTotalCasos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
): Promise<void> {
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
): Promise<void> {
  try {
    const reportesService = new ReportesService()
    const data = await reportesService.getTotalConsultas()
    res.json(data)
  } catch (error) {
    next(error)
  }
}
