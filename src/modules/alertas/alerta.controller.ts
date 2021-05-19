import { NextFunction, Request, Response } from 'express'
import { AlertaRepository } from './alerta.repository'
import { getCustomRepository } from 'typeorm'
import { ErrorHandler } from '../../middlewares/error_handler'
import { AlertEnum } from '../../entities'

class AlertaController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    try {
      const alertas = await alertRepository.findAll()
      res.json(alertas)
    } catch (error) {
      next(new ErrorHandler(500, error.message))
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { alerta_id } = req.params
    try {
      const alerta = await alertRepository.findOne(alerta_id)
      res.json(alerta)
    } catch (error) {
      next(new ErrorHandler(500, error.message))
    }
  }

  async createAlert(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { usuario_id, alerta } = req.body
    try {
      const saved = await alertRepository.createAlert(usuario_id, alerta)
      res.json(saved)
    } catch (error) {
      next(new ErrorHandler(500, error.message))
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { alerta_id } = req.params
    try {
      const alerta = await alertRepository.updateAlert(alerta_id, req.body)
      res.json(alerta)
    } catch (error) {
      next(new ErrorHandler(500, error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { alerta_id } = req.params
    try {
      const deleted = await alertRepository.deleteAlert(alerta_id)
      res.json(deleted)
    } catch (error) {
      next(new ErrorHandler(500, error.message))
    }
  }

  async findUserAlerts(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { usuario_id } = req.params
    try {
      const alertas = await alertRepository.findUserAlerts(usuario_id)
      res.json(alertas)
    } catch (error) {
      next(new ErrorHandler(500, error.message))
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { alerta_id } = req.params
    try {
      const saved = await alertRepository.updateAlert(alerta_id, {
        status: AlertEnum.LEIDA,
      })
      res.json(saved)
    } catch (error) {
      next(new ErrorHandler(500, error.message))
    }
  }
}

export default new AlertaController()
