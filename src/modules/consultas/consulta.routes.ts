import { Router } from 'express'
import * as Controller from './consulta.controller'
import { check } from 'express-validator'
import {
  validateModalidadConsulta,
  validateConsultaStatus,
  validateBody,
  verifyRoles,
} from '../../middlewares/'
import passport from '../../libs/passport'
import { RolEnum } from '../../entities'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

// --------------------- Consultas ---------------------------------
router.post(
  '/',
  verifyRoles(RolEnum.ESTUDIANTE, RolEnum.PERSONAL),
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
  verifyRoles(RolEnum.MEDICO),
  [
    check('modalidad').optional().custom(validateModalidadConsulta),
    check('status').optional().custom(validateConsultaStatus),
    validateBody,
  ],
  Controller.updateConsulta
)

router.get(
  '/',
  verifyRoles(RolEnum.MEDICO, RolEnum.MONITOR),
  Controller.findAll
)

router.get(
  '/usuario/:usuario_id',
  verifyRoles(
    RolEnum.MEDICO,
    RolEnum.MONITOR,
    RolEnum.ESTUDIANTE,
    RolEnum.PERSONAL
  ),
  Controller.findByUser
)

//TODO obtener todas las consultas por medico

router.delete(
  '/:solicitud_id',
  verifyRoles(RolEnum.MEDICO),
  Controller.deleteConsulta
)

export default router
