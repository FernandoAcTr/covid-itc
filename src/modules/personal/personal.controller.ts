import { NextFunction, Request, Response } from 'express'
import {
  getCustomRepository,
  getRepository,
  createQueryBuilder,
  In,
} from 'typeorm'
import { Departamento, Personal, Rol, RolEnum, Usuario } from '../../entities'
import { requireSurvey } from '../../helpers/require_surver.helper'
import { UserRepository } from '../user/user.repository'
import { ErrorHandler } from '../../middlewares/error_handler'

export async function signup(req: Request, res: Response, next: NextFunction) {
  const {
    nombre,
    a_paterno,
    a_materno,
    departamento_id,
    rfc,
    email,
    password,
  } = req.body
  const userRepository = getCustomRepository(UserRepository)

  try {
    // Create user Role
    const userRol = await getRepository(Rol).findOneOrFail({
      where: { rol: In([RolEnum.PERSONAL]) },
    })

    //create user
    const usuario = new Usuario()
    usuario.email = email
    usuario.password = userRepository.encrypPassword(password)
    usuario.roles = [userRol]
    usuario.requireSuvey = await requireSurvey()

    //find department
    const departamento = await getRepository(Departamento).findOneOrFail(
      departamento_id
    )

    //create personal
    const personal = new Personal()
    personal.nombre = nombre
    personal.a_materno = a_materno
    personal.a_paterno = a_paterno
    personal.usuario = usuario
    personal.rfc = rfc
    personal.departamento = departamento

    const saved = await getRepository(Personal).save(personal)

    const token = userRepository.createToken(saved.usuario)
    res.json({
      token,
      personal,
    })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const personal = await createQueryBuilder(Personal, 'p')
    .leftJoinAndSelect('p.usuario', 'u')
    .leftJoinAndSelect('p.departamento', 'c')
    .leftJoinAndSelect('u.roles', 'r')
    .getMany()

  res.json(personal)
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const { personal_id } = req.params

  try {
    const personal = await getRepository(Personal).findOneOrFail(personal_id, {
      relations: ['usuario'],
    })
    res.json(personal)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function edit(req: Request, res: Response, next: NextFunction) {
  const { nombre, a_paterno, a_materno, departamento_id, rfc } = req.body
  const { personal_id } = req.params
  try {
    //find departament
    const departamento = await getRepository(Departamento).findOne({
      where: { departamento_id },
    })

    //find personal
    const personal = await getRepository(Personal).findOneOrFail(personal_id)
    personal.nombre = nombre || personal.nombre
    personal.a_materno = a_materno || personal.a_materno
    personal.a_paterno = a_paterno || personal.a_paterno
    personal.departamento = departamento || personal.departamento
    personal.rfc = rfc || personal.rfc

    const saved = await getRepository(Personal).save(personal)
    res.json(saved)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}
