import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsuarioRepository } from '../usuario/usuario.repository'
import { PersonalRepository } from './personal.repository'

export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userRepository = getCustomRepository(UsuarioRepository)
  const personalRepository = getCustomRepository(PersonalRepository)

  try {
    const saved = await personalRepository.store(req.body)

    const token = userRepository.createToken(saved.usuario)
    res.json({
      token,
      saved,
    })
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
    const personalRepository = getCustomRepository(PersonalRepository)
    const personal = await personalRepository.findAll()
    res.json(personal)
  } catch (error) {
    next(error)
  }
}

export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { personal_id } = req.params
  const personalRepository = getCustomRepository(PersonalRepository)

  try {
    const personal = await personalRepository.findOne(personal_id)
    res.json(personal)
  } catch (error) {
    next(error)
  }
}

export async function edit(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { personal_id } = req.params
  const personalRepository = getCustomRepository(PersonalRepository)

  try {
    const saved = await personalRepository.edit(personal_id, req.body)
    res.json(saved)
  } catch (error) {
    next(error)
  }
}
