import { Router } from 'express'
import { check } from 'express-validator'
import * as Controller from './encuesta.controller'
import {
  validateModality,
  validateRespuestas,
} from '../../middlewares/express_validators'
import { validateBody } from '../../middlewares/validate_body'

const router = Router()

router.get('/modalidad', Controller.getModality)
router.post(
  '/modalidad',
  [check('modalidad').custom(validateModality), validateBody],
  Controller.changeModality
)

router.get('/preguntas', Controller.getPreguntas)

router.post(
  '/',
  [
    check('usuario_id', 'El campo usuario_id es obligatorio').notEmpty(),
    check('otros_sintomas', 'El campo otros_sintomas es obligatorio')
      .optional()
      .isString()
      .withMessage('El campo otros_sintomas debe ser String'),
    check('respuestas', 'El campo respuestas es obligatorio')
      .notEmpty()
      .isArray()
      .withMessage('El campo respuestas debe ser un array')
      .custom(validateRespuestas),
    validateBody,
  ],
  Controller.createEncuesta
)

router.get('/:encuesta_id', Controller.findOne)
router.get('/usuario/:usuario_id', Controller.findAllByUserId)
router.get('/', Controller.findAll)

export default router
