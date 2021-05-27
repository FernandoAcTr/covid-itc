import { Router } from 'express'
import { check } from 'express-validator'
import * as Controller from './encuesta.controller'
import {
  validateModality,
  validateRespuestas,
  validateBody,
  verifyRoles,
  RolEnum,
} from '../../middlewares/'
import passport from '../../libs/passport'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

// ---------------------- Define Modality --------------------------
router.get(
  '/modalidad',
  verifyRoles(RolEnum.MEDICO, RolEnum.MONITOR),
  Controller.getModality
)
router.post(
  '/modalidad',
  verifyRoles(RolEnum.MEDICO),
  [check('modalidad').custom(validateModality), validateBody],
  Controller.changeModality
)

// ---------------------- Answer questionary -------------------------
router.get('/preguntas', Controller.getPreguntas)

router.post(
  '/',
  verifyRoles(RolEnum.ESTUDIANTE, RolEnum.PERSONAL),
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

router.get(
  '/:encuesta_id',
  verifyRoles(
    RolEnum.ESTUDIANTE,
    RolEnum.PERSONAL,
    RolEnum.MEDICO,
    RolEnum.MONITOR
  ),
  Controller.findOne
)

router.get(
  '/usuario/:usuario_id',
  verifyRoles(
    RolEnum.ESTUDIANTE,
    RolEnum.PERSONAL,
    RolEnum.MEDICO,
    RolEnum.MONITOR
  ),
  Controller.findAllByUserId
)
router.get(
  '/',
  verifyRoles(RolEnum.MEDICO, RolEnum.MONITOR),
  Controller.findAll
)

export default router
