import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsuarioRepository } from '../usuario/usuario.repository'
import { MedicoRepository } from './medico.repository'

export async function signup(req: Request, res: Response, next: NextFunction) {
  const userRepository = getCustomRepository(UsuarioRepository)
  const medicoRepository = getCustomRepository(MedicoRepository)

  try {
    const saved = await medicoRepository.store(req.body)
    const token = userRepository.createToken(saved.usuario)
    res.json({
      token,
      saved,
    })
  } catch (error) {
    next(error)
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const { medico_id } = req.params
  const medicoRepository = getCustomRepository(MedicoRepository)
  try {
    const medico = await medicoRepository.findOne(medico_id)
    res.json(medico)
  } catch (error) {
    next(error)
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const medicoRepository = getCustomRepository(MedicoRepository)
  const medicos = await medicoRepository.findAll()
  res.json(medicos)
}

export async function edit(req: Request, res: Response, next: NextFunction) {
  const { medico_id } = req.params
  const medicoRepository = getCustomRepository(MedicoRepository)

  try {
    const saved = await medicoRepository.edit(medico_id, req.body)
    res.json(saved)
  } catch (error) {
    next(error)
  }
}
