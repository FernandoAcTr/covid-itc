import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { CarreraRepository } from './carrera.repository'

export async function signup(req: Request, res: Response, next: NextFunction)
{
  const carreraRepository = getCustomRepository(CarreraRepository)

  try
  {
    const saved = await carreraRepository.store(req.body)

    res.json({
      carrera: saved,
    })
  }
  catch (error)
  {
    next(error)
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction)
{
  const { carrera_id } = req.params
  const carreraRepository = getCustomRepository(CarreraRepository)

  try
  {
    const carrera = await carreraRepository.findOne(carrera_id)
    res.json(carrera)
  }
  catch (error)
  {
    next(error)
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction)
{
  const studentRepository = getCustomRepository(CarreraRepository)
  const estudiantes = await studentRepository.findAll()
  res.json(estudiantes)
}

export async function edit(req: Request, res: Response, next: NextFunction)
{
  const { estudiante_id } = req.params
  const studentRepository = getCustomRepository(CarreraRepository)

  try
  {
    const saved = await studentRepository.update(estudiante_id, req.body)
    res.json(saved)
  }
  catch (error)
  {
    next(error)
  }
}

export function responseSurvey(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export function getAlerts(req: Request, res: Response, next: NextFunction) {}

export function getOrders(req: Request, res: Response, next: NextFunction) {}

export function requestConsulta(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export function getConsultas(req: Request, res: Response, next: NextFunction) {}
