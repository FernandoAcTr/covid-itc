import { NextFunction, Request, Response } from 'express'
import {
  createQueryBuilder,
  getCustomRepository,
  getRepository,
  In,
} from 'typeorm'
import { Medico, Rol, RolEnum } from '../../entities'
import { UserRepository } from '../user/user.repository'
import { Usuario } from '../../entities/usuario.entity'
import { ErrorHandler } from '../../middlewares/error_handler'

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { nombre, a_paterno, a_materno, rfc, cedula, email, password } =
    req.body
  const userRepository = getCustomRepository(UserRepository)

  try {
    // Create user Role
    const userRol = await getRepository(Rol).findOneOrFail({
      where: { rol: In([RolEnum.MEDICO]) },
    })

    //create user
    const usuario = new Usuario()
    usuario.email = email
    usuario.password = userRepository.encrypPassword(password)
    usuario.roles = [userRol]
    usuario.requireSuvey = false

    //create medico
    const medico = new Medico()
    medico.nombre = nombre
    medico.a_materno = a_materno
    medico.a_paterno = a_paterno
    medico.usuario = usuario
    medico.rfc = rfc
    medico.cedula = cedula

    const saved = await getRepository(Medico).save(medico)

    const token = userRepository.createToken(saved.usuario)
    res.json({
      token,
      medico,
    })
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const { medico_id } = req.params

  try {
    const medico = await getRepository(Medico).findOne(medico_id, {
      relations: ['usuario'],
    })
    if (!medico)
      return next(
        new ErrorHandler(404, 'No existe el medico con id ' + medico_id)
      )

    res.json(medico)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const medicos = await createQueryBuilder(Medico, 'm')
    .leftJoinAndSelect('m.usuario', 'u')
    .leftJoinAndSelect('u.roles', 'r')
    .getMany()

  res.json(medicos)
}

export async function edit(req: Request, res: Response, next: NextFunction) {
  const { nombre, a_paterno, a_materno, rfc, cedula } = req.body
  const { medico_id } = req.params

  try {
    //find medico
    const medico = await getRepository(Medico).findOneOrFail(medico_id)
    medico.nombre = nombre || medico.nombre
    medico.a_materno = a_materno || medico.a_materno
    medico.a_paterno = a_paterno || medico.a_paterno
    medico.cedula = cedula || medico.cedula
    medico.rfc = rfc || medico.rfc

    const saved = await getRepository(Medico).save(medico)
    res.json(saved)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}
