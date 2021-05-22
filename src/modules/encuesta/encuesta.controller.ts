import { NextFunction, Request, Response } from 'express'
import { ErrorHandler } from '../../middlewares/error_handler'
import { getCustomRepository } from 'typeorm'
import { ModalidadEncuestaRepository } from './modalidad_encuesta.repository'
import { EncuestaRepository } from './encuesta.repository'

export async function changeModality(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { modalidad } = req.body

  try {
    const modality = await getCustomRepository(
      ModalidadEncuestaRepository
    ).setModality(modalidad)

    res.json(modality)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function getModality(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const modalidad = await getCustomRepository(
      ModalidadEncuestaRepository
    ).getModality()
    res.json(modalidad)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function getPreguntas(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const preguntas = await getCustomRepository(
      EncuestaRepository
    ).getPreguntas()
    res.json(preguntas)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function createEncuesta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const encuesta = await getCustomRepository(
      EncuestaRepository
    ).createEncuesta(req.body)
    console.log(encuesta)

    res.json(encuesta)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const { encuesta_id } = req.params
  try {
    const encuesta = await getCustomRepository(EncuestaRepository).findOne(
      Number(encuesta_id)
    )

    res.json(encuesta)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function findAllByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { usuario_id } = req.params

  try {
    const encuestas = await getCustomRepository(
      EncuestaRepository
    ).findAllByUserId(usuario_id)

    res.json(encuestas)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const encuestas = await getCustomRepository(EncuestaRepository).findAll()

    res.json(encuestas)
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
}
