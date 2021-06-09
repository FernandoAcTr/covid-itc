import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsuarioRepository } from '../usuario/usuario.repository'
import { StudentRepository } from './estudiante.repository'

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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

export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { estudiante_id } = req.params
  const studentRepository = getCustomRepository(StudentRepository)
  try {
    const estudiante = await studentRepository.findOne(estudiante_id)
    res.json(estudiante)
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
    const studentRepository = getCustomRepository(StudentRepository)
    const estudiantes = await studentRepository.findAll()
    res.json(estudiantes)
  } catch (error) {
    next(error)
  }
}

export async function edit(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { estudiante_id } = req.params
  const studentRepository = getCustomRepository(StudentRepository)

  try {
    const saved = await studentRepository.update(estudiante_id, req.body)
    res.json(saved)
  } catch (error) {
    next(error)
  }
}
