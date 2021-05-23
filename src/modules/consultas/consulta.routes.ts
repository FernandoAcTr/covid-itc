import { Router } from 'express'
import * as Controller from './consulta.controller'
import { check } from 'express-validator'
import { validateBody } from '../../middlewares/validate_body'
import {
  validateModalidadConsulta,
  validateConsultaStatus,
} from '../../middlewares/express_validators'

const router = Router()

router.post(
  '/',
  [
    check('usuario_id', 'El campo usuario_id es obligatorio').notEmpty(),
    check('sintomas', 'El campo sintomas es obligatorio').notEmpty(),
    check('modalidad', 'El campo modalidad es obligatorio')
      .notEmpty()
      .custom(validateModalidadConsulta),
    validateBody,
  ],
  Controller.createConsulta
)

router.put(
  '/:solicitud_id',
  [
    check('modalidad').optional().custom(validateModalidadConsulta),
    check('status').optional().custom(validateConsultaStatus),
    validateBody,
  ],
  Controller.updateConsulta
)

router.get('/', Controller.findAll)
router.get('/usuario/:usuario_id', Controller.findByUser)
router.delete('/:solicitud_id', Controller.deleteConsulta)

export default router
