import { NextFunction, Request, Response } from 'express'
import { getCustomRepository, getRepository, createQueryBuilder } from 'typeorm'
import { Carrera, Estudiante, Rol, RolEnum, Usuario } from '../../entities'
import { requireSurvey } from '../../helpers/require_surver.helper'
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
    usuario.requireSuvey = await requireSurvey()

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

//TODO hacer que solo el estudiante logueado o administrador puedan ver la informacion de este estudiante
export async function findOne(req: Request, res: Response, next: NextFunction) {
  const { estudiante_id } = req.params

  try {
    const estudiante = await getRepository(Estudiante).findOne(estudiante_id, {
      relations: ['usuario'],
    })
    if (!estudiante)
      return next(
        new ErrorHandler(404, 'No existe el estudiante con id ' + estudiante_id)
      )

    res.json(estudiante)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

//TODO proteger ruta por administrador
export async function findAll(req: Request, res: Response, next: NextFunction) {
  const estudiantes = await createQueryBuilder(Estudiante, 'e')
    .leftJoinAndSelect('e.usuario', 'u')
    .leftJoinAndSelect('e.carrera', 'c')
    .getMany()

  res.json(estudiantes)
}

//TODO proteger ruta por administrador
export async function edit(req: Request, res: Response, next: NextFunction) {
  const { nombre, a_paterno, a_materno, carrera_id, estudiante_id } = req.body

  try {
    //find carrer
    const carrera = await getRepository(Carrera).findOneOrFail(carrera_id)

    //find student
    const estudiante = await getRepository(Estudiante).findOneOrFail(
      estudiante_id
    )
    estudiante.nombre = nombre || estudiante.nombre
    estudiante.a_materno = a_materno || estudiante.a_materno
    estudiante.a_paterno = a_paterno || estudiante.a_paterno
    estudiante.carrera = carrera || estudiante.carrera

    const saved = await getRepository(Estudiante).save(estudiante)
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
