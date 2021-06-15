import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { TipoPruebaRepository } from './tipo_prueba.repository'

export async function store(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tipo = await getCustomRepository(TipoPruebaRepository).store(
      req.body.descripcion
    )
    res.json(tipo)
  } catch (error) {
    next(error)
  }
}

export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tipo = await getCustomRepository(TipoPruebaRepository).findOne(
      Number(req.params.tipo_id)
    )
    res.json(tipo)
  } catch (error) {
    next(error)
  }
}

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tipos = await getCustomRepository(TipoPruebaRepository).findAll()
    res.json(tipos)
  } catch (error) {
    next(error)
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tipo = await getCustomRepository(TipoPruebaRepository).update(
      Number(req.params.tipo_id),
      req.body.descripcion
    )
    res.json(tipo)
  } catch (error) {
    next(error)
  }
}

export async function deleteTipo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const tipo = await getCustomRepository(TipoPruebaRepository).deleteTipo(
      Number(req.params.tipo_id)
    )
    res.json(tipo)
  } catch (error) {
    next(error)
  }
}
