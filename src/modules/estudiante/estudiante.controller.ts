import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ErrorHandler } from '../../middlewares/error_handler'
import { UserRepository } from '../user/user.repository'
import { StudentRepository } from './estudiante.repository'

export async function signup(req: Request, res: Response, next: NextFunction) {
  const userRepository = getCustomRepository(UserRepository)
  const studentRepository = getCustomRepository(StudentRepository)
  try {
    const saved = await studentRepository.store(req.body)

    const token = userRepository.createToken(saved.usuario)
    res.json({
      token,
      estudiante: saved,
    })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

//TODO hacer que solo el estudiante logueado o administrador puedan ver la informacion de este estudiante
export async function findOne(req: Request, res: Response, next: NextFunction) {
  const { estudiante_id } = req.params
  const studentRepository = getCustomRepository(StudentRepository)
  try {
    const estudiante = await studentRepository.findOne(estudiante_id)

    res.json(estudiante)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

//TODO proteger ruta por administrador
export async function findAll(req: Request, res: Response, next: NextFunction) {
  const studentRepository = getCustomRepository(StudentRepository)
  const estudiantes = await studentRepository.findAll()
  res.json(estudiantes)
}

//TODO proteger ruta por administrador
export async function edit(req: Request, res: Response, next: NextFunction) {
  const { estudiante_id } = req.params
  const studentRepository = getCustomRepository(StudentRepository)

  try {
    const saved = await studentRepository.update(estudiante_id, req.body)
    res.json(saved)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
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
