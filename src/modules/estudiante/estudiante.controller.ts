import { NextFunction, Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import { Carrera, Estudiante, Rol, RolEnum, Usuario } from '../../entities'
import { ErrorHandler } from '../../middlewares/error_handler'
import { UserRepository } from '../user/user.repository'

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { nombre, a_paterno, a_materno, carrera_id, email, password } = req.body
  const userRepository = getCustomRepository(UserRepository)

  try {
    // Create user Role
    const userRol = new Rol()
    userRol.rol = RolEnum.ESTUDIANTE

    //create user
    const usuario = new Usuario()
    usuario.email = email
    usuario.password = userRepository.encrypPassword(password)
    usuario.roles = [userRol]

    //find carrer
    const carrera = await getRepository(Carrera).findOneOrFail(carrera_id)

    //create student
    const estudiante = new Estudiante()
    estudiante.nombre = nombre
    estudiante.a_materno = a_materno
    estudiante.a_paterno = a_paterno
    estudiante.usuario = usuario
    estudiante.carrera = carrera

    const saved = await getRepository(Estudiante).save(estudiante)

    const token = userRepository.createToken(saved.usuario)
    res.json({
      token,
      estudiante,
    })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export function findOne(req: Request, res: Response, next: NextFunction) {}

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
