import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from './user.repository'
import { ErrorHandler } from '../../middlewares/error_handler'

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body
  const userRepository = getCustomRepository(UserRepository)
  try {
    const user = await userRepository.findOne({
      where: { email },
    })
    if (!user) next(new ErrorHandler(404, 'Credenciales invalidas'))

    const match = userRepository.comparePassword(user!, password)
    if (!match) next(new ErrorHandler(404, 'Credenciales invalidas'))

    const token = userRepository.createToken(user!)
    res.json({ token, usuario: user })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}
