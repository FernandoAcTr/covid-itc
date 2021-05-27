import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsuarioRepository } from '../usuario/usuario'
import { StudentRepository } from './estudiante.repository'

export async function signup(req: Request, res: Response, next: NextFunction) {
  const userRepository = getCustomRepository(UsuarioRepository)
  const studentRepository = getCustomRepository(StudentRepository)
  try {
    const saved = await studentRepository.store(req.body)

    const token = userRepository.createToken(saved.usuario)
    res.json({
      token,
      estudiante: saved,
    })
  } catch (error) {
    next(error)
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const { estudiante_id } = req.params
  const studentRepository = getCustomRepository(StudentRepository)
  try {
    const estudiante = await studentRepository.findOne(estudiante_id)
    res.json(estudiante)
  } catch (error) {
    next(error)
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const studentRepository = getCustomRepository(StudentRepository)
  const estudiantes = await studentRepository.findAll()
  res.json(estudiantes)
}

export async function edit(req: Request, res: Response, next: NextFunction) {
  const { estudiante_id } = req.params
  const studentRepository = getCustomRepository(StudentRepository)

  try {
    const saved = await studentRepository.update(estudiante_id, req.body)
    res.json(saved)
  } catch (error) {
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
