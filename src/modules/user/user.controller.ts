import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from './user.repository'
import { ErrorHandler } from '../../middlewares/error_handler'

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body
  const userRepository = getCustomRepository(UserRepository)
  try {
    const user = await userRepository.findByEmail(email)

    if (!user) return next(new ErrorHandler(404, 'Credenciales invalidas'))

    const match = userRepository.comparePassword(user!, password)
    if (!match) return next(new ErrorHandler(404, 'Credenciales invalidas'))

    if (!user?.habilitado)
      return next(new ErrorHandler(401, 'Usuario dehsabilitado'))

    const token = userRepository.createToken(user!)
    res.json({ token, usuario: user })
  } catch (error) {
    next(error)
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const userRepository = getCustomRepository(UserRepository)

  try {
    const usuarios = await userRepository.findAll()
    res.json(usuarios)
  } catch (error) {
    next(error)
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const userRepository = getCustomRepository(UserRepository)
  try {
    const { usuario_id } = req.params
    const usuario = await userRepository.findOne(usuario_id)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
}

export async function disableUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { usuario_id } = req.params
  const userRepository = getCustomRepository(UserRepository)

  try {
    const saved = await userRepository.update(usuario_id, { habilitado: false })
    res.json(saved)
  } catch (error) {
    next(error)
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { usuario_id } = req.params
  const userRepository = getCustomRepository(UserRepository)
  try {
    const saved = await userRepository.update(usuario_id, req.body)
    res.json(saved)
  } catch (error) {
    next(error)
  }
}
