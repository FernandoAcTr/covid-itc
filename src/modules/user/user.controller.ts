import { Request, Response, NextFunction } from 'express'
import { getCustomRepository, getRepository, In } from 'typeorm'
import { UserRepository } from './user.repository'
import { ErrorHandler } from '../../middlewares/error_handler'
import { Rol, Usuario } from '../../entities'

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body
  const userRepository = getCustomRepository(UserRepository)
  try {
    const user = await userRepository.findOne({
      where: { email },
    })

    if (!user) return next(new ErrorHandler(404, 'Credenciales invalidas'))

    const match = userRepository.comparePassword(user!, password)
    if (!match) return next(new ErrorHandler(404, 'Credenciales invalidas'))

    if (!user?.habilitado)
      return next(new ErrorHandler(401, 'Usuario dehsabilitado'))

    const token = userRepository.createToken(user!)
    res.json({ token, usuario: user })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const usuarios = await getRepository(Usuario).find()
    res.json(usuarios)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { usuario_id } = req.params
    const usuario = await getRepository(Usuario).findOne(usuario_id)
    if (!usuario) return next(new ErrorHandler(404, 'Usuario no encontrado'))
    res.json(usuario)
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

  try {
    const usuario = await getRepository(Usuario).findOne(usuario_id)
    if (!usuario)
      return next(
        new ErrorHandler(404, 'No existe un usuario con id' + usuario_id)
      )

    usuario.habilitado = false
    const saved = await getRepository(Usuario).save(usuario)
    res.json(saved)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, habilitado, sospechoso, requireSurvey, roles } =
    req.body
  const { usuario_id } = req.params

  const userRepository = getCustomRepository(UserRepository)
  try {
    const user = await userRepository.findOneOrFail(usuario_id)
    user.email = email || user.email
    user.password =
      password !== undefined
        ? userRepository.encrypPassword(password)
        : user.password
    user.habilitado = habilitado !== undefined ? habilitado : user.habilitado
    user.sospechoso = sospechoso !== undefined ? sospechoso : user.sospechoso
    user.requireSuvey =
      requireSurvey !== undefined ? requireSurvey : user.requireSuvey

    //update roles
    user.roles = roles
      ? await getRepository(Rol).find({
          where: { rol: In(roles) },
        })
      : user.roles

    const saved = await userRepository.save(user)
    res.json(saved)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}
