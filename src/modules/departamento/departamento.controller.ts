import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { DepartamentoRepository } from './departamento.repository'

export async function create(req: Request, res: Response, next: NextFunction)
{
  const departamentoRepository = getCustomRepository(DepartamentoRepository)

  try
  {
    const saved = await departamentoRepository.store(req.body)

    res.json({
      departamento: saved,
    })
  }
  catch (error)
  {
    next(error)
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction)
{
  const { departamento_id } = req.params
  const departamentoRepository = getCustomRepository(DepartamentoRepository)

  try
  {
    const departamento = await departamentoRepository.findOne(departamento_id)
    res.json(departamento)
  }
  catch (error)
  {
    next(error)
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction)
{
  const departamentoRepository = getCustomRepository(DepartamentoRepository)
  const departamentos = await departamentoRepository.findAll()
  res.json(departamentos)
}

export async function edit(req: Request, res: Response, next: NextFunction)
{
  const { departamento_id } = req.params
  const departamentoRepository = getCustomRepository(DepartamentoRepository)

  try
  {
    const saved = await departamentoRepository.update(departamento_id, req.body)
    res.json(saved)
  }
  catch (error)
  {
    next(error)
  }
}

export async function deleteDepartamento(
  req: Request,
  res: Response,
  next: NextFunction
)
{
  const { departamento_id } = req.params
  try {
    const deleted = await getCustomRepository(DepartamentoRepository).delete(
      departamento_id
    )
    res.json(deleted)
  }
  catch (error)
  {
    next(error)
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
