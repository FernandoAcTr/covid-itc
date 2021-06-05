import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { CarreraRepository } from './carrera.repository'

export async function store(req: Request, res: Response, next: NextFunction) {
  const carreraRepository = getCustomRepository(CarreraRepository)

  try {
    const saved = await carreraRepository.store(req.body)

    res.json({
      carrera: saved,
    })
  } catch (error) {
    next(error)
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const { carrera_id } = req.params
  const carreraRepository = getCustomRepository(CarreraRepository)

  try {
    const carrera = await carreraRepository.findOne(carrera_id)
    res.json(carrera)
  } catch (error) {
    next(error)
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const studentRepository = getCustomRepository(CarreraRepository)
  const estudiantes = await studentRepository.findAll()
  res.json(estudiantes)
}

export async function edit(req: Request, res: Response, next: NextFunction) {
  const { carrera_id } = req.params
  const carreraRepository = getCustomRepository(CarreraRepository)

  try {
    const saved = await carreraRepository.update(carrera_id, req.body)
    res.json(saved)
  } catch (error) {
    next(error)
  }
}

export async function deleteCarrera(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { carrera_id } = req.params
  try {
    const deleted = await getCustomRepository(CarreraRepository).delete(
      carrera_id
    )
    res.json(deleted)
  } catch (error) {
    next(error)
  }
}
