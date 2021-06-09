import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { OrdenRepository } from './ordenes.repository'

export async function createOrden(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const orden = await getCustomRepository(OrdenRepository).createOrder(
      req.body
    )
    res.json(orden)
  } catch (error) {
    next(error)
  }
}

export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { orden_id } = req.params

  try {
    const orden = await getCustomRepository(OrdenRepository).findOne(orden_id)
    res.json(orden)
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
    const ordenes = await getCustomRepository(OrdenRepository).findAll()
    res.json(ordenes)
  } catch (error) {
    next(error)
  }
}

export async function findByUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { usuario_id } = req.params

  try {
    const ordenes = await getCustomRepository(OrdenRepository).findByUser(
      usuario_id
    )
    res.json(ordenes)
  } catch (error) {
    next(error)
  }
}

export async function deleteOrden(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { orden_id } = req.params
  try {
    const deleted = await getCustomRepository(OrdenRepository).deleteOrden(
      orden_id
    )
    res.json(deleted)
  } catch (error) {
    next(error)
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { orden_id } = req.params
  try {
    const updated = await getCustomRepository(OrdenRepository).update(
      orden_id,
      req.body
    )
    res.json(updated)
  } catch (error) {
    next(error)
  }
}
