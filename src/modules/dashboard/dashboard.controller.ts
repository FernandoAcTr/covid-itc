import { NextFunction, Request, Response } from 'express'
import { DashboardRepository } from './dashboard.repository'

export async function getDashboard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dashboardRepository = new DashboardRepository()

    const numMedicos = await dashboardRepository.getNumMedicos()
    const numEstudiantes = await dashboardRepository.getNumEstudiantes()
    const numPersonal = await dashboardRepository.getNumPersonal()
    const numConsultas = await dashboardRepository.getTotalConsultas()
    const numEncuestas = await dashboardRepository.getTotalEncuestas()
    const numOrdenes = await dashboardRepository.getNumOrdenes()
    const numPositivos = await dashboardRepository.getNumPositivos()
    const numSospechosos = await dashboardRepository.getNumSospechosos()
    const contagios_last_month = await dashboardRepository.getContagios()
    const consultas_last_month = await dashboardRepository.getConsultas()

    res.json({
      numMedicos,
      numEstudiantes,
      numPersonal,
      numConsultas,
      numEncuestas,
      numOrdenes,
      numPositivos,
      numSospechosos,
      contagios_last_month,
      consultas_last_month,
    })
  } catch (error) {
    next(error)
  }
}
