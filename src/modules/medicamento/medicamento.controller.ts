import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { MedicamentoRepository } from './medicamento.repository'

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const medicamentos = await getCustomRepository(
      MedicamentoRepository
    ).findAll()
    res.json(medicamentos)
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
    const medicamento = await getCustomRepository(
      MedicamentoRepository
    ).findOne(req.params.medicamento_id)
    res.json(medicamento)
  } catch (error) {
    next(error)
  }
}

export async function store(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { descripcion } = req.body
  try {
    const medicamento = await getCustomRepository(MedicamentoRepository).store(
      descripcion
    )
    res.json(medicamento)
  } catch (error) {
    next(error)
  }
}

export async function deleteMedicamento(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const medicamento = await getCustomRepository(MedicamentoRepository).delete(
      req.params.medicamento_id
    )
    res.json(medicamento)
  } catch (error) {
    next(error)
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { descripcion } = req.body
  try {
    const medicamento = await getCustomRepository(MedicamentoRepository).update(
      req.params.medicamento_id,
      descripcion
    )
    res.json(medicamento)
  } catch (error) {
    next(error)
  }
}
