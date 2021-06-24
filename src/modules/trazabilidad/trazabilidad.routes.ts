import { Router } from 'express'
import * as Controller from './trazabilidad.controller'
import { check } from 'express-validator'
import { validateBody } from '../../middlewares/validate_body'

const router = Router()

router.get('/:usuario_id', Controller.getTrazability)

router.get('/', Controller.findAll)

router.post(
  '/',
  [
    check('usuario_id', 'El campo usuario_id es obligatorio').notEmpty(),
    check('contacto_id', 'El campo contacto_id es obligatorio').notEmpty(),
    check('fecha', 'El campo fecha es obligatorio').notEmpty(),
    validateBody,
  ],
  Controller.addContact
)

router.put(
  '/:trazabilidad_id',
  [
    check('avisado')
      .optional()
      .isBoolean()
      .withMessage('El campo avisado debe ser un booleano'),
    validateBody,
  ],
  Controller.update
)

router.delete('/:trazabilidad_id', Controller.deleteContact)

export default router
