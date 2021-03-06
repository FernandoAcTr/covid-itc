import dateformat from 'dateformat'
import { NextFunction, Request, Response } from 'express'
import { AlertaRepository } from './alerta.repository'
import { getCustomRepository } from 'typeorm'
import { AlertEnum } from '../../entities'
import { compile } from '../../helpers/compile_hbs'
import { sendMail } from '../../libs/mailer'
import { settings } from '../../config/settings'
const { EMAIL_CREDENTIALS } = settings

class AlertaController {
  async findOne(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { alerta_id } = req.params
    try {
      const alerta = await alertRepository.findOne(alerta_id)
      res.json(alerta)
    } catch (error) {
      next(error)
    }
  }

  async createAlert(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { usuario_id, alerta } = req.body
    try {
      const saved = await alertRepository.createAlert(usuario_id, alerta)
      const email = compile('alerta.hbs', {
        fecha: dateformat(Date.now(), 'dd-mm-yyyy'),
        alerta,
        departamento: 'Departamento Médico',
      })
      sendMail(
        EMAIL_CREDENTIALS.EMAIL!,
        saved.usuario.email,
        'Ha recibido una nueva alerta',
        email
      )
      res.json(saved)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { alerta_id } = req.params
    try {
      const alerta = await alertRepository.updateAlert(alerta_id, req.body)
      res.json(alerta)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { alerta_id } = req.params
    try {
      const deleted = await alertRepository.deleteAlert(alerta_id)
      res.json(deleted)
    } catch (error) {
      next(error)
    }
  }

  async findUserAlerts(req: Request, res: Response, next: NextFunction) {
    const alertRepository = getCustomRepository(AlertaRepository)
    const { usuario_id } = req.params
    try {
      const alertas = await alertRepository.findUserAlerts(usuario_id)
      res.json(alertas)
    } catch (error) {
      next(error)
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
      next(error)
    }
  }
}

export default new AlertaController()
