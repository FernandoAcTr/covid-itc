import { Request, Response, NextFunction } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import { UserRepository } from './user.repository'
import { ErrorHandler } from '../../middlewares/error_handler'
import { Usuario } from '../../entities'

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body
  const userRepository = getCustomRepository(UserRepository)
  try {
    const user = await userRepository.findOne({
      where: { email },
    })
    if (!user?.habilitado)
      return next(new ErrorHandler(401, 'Usuario dehsabilitado'))

    if (!user) return next(new ErrorHandler(404, 'Credenciales invalidas'))

    const match = userRepository.comparePassword(user!, password)
    if (!match) return next(new ErrorHandler(404, 'Credenciales invalidas'))

    const token = userRepository.createToken(user!)
    res.json({ token, usuario: user })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

//TODO proteger ruta por administrador
export async function disableUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { usuario_id } = req.params

  const usuario = await getRepository(Usuario).findOne(usuario_id)
  if (!usuario)
    return next(
      new ErrorHandler(404, 'No existe un usuario con id' + usuario_id)
    )

  usuario.habilitado = false
  const saved = await getRepository(Usuario).save(usuario)
  res.json(saved)
}
