import { Router } from 'express'
import * as Controller from './solicitud.controller'
import { check } from 'express-validator'
import {
  validateModalidadConsulta,
  validateConsultaStatus,
  validateBody,
  verifyRol,
  verifyResourceReceta,
} from '../../middlewares'
import passport from '../../libs/passport'
import { RolEnum } from '../../entities'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

// --------------------- Consultas ---------------------------------
router.post(
  '/',
  verifyRol(RolEnum.ESTUDIANTE, RolEnum.PERSONAL),
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
  verifyRol(RolEnum.MEDICO),
  [
    check('modalidad').optional().custom(validateModalidadConsulta),
    check('status').optional().custom(validateConsultaStatus),
    validateBody,
  ],
  Controller.updateConsulta
)

router.get('/', verifyRol(RolEnum.MEDICO, RolEnum.MONITOR), Controller.findAll)

router.get(
  '/:solicitud_id',
  verifyRol(RolEnum.MEDICO, RolEnum.MONITOR),
  Controller.findOne
)

router.get(
  '/usuario/:usuario_id',
  verifyRol(
    RolEnum.MEDICO,
    RolEnum.MONITOR,
    RolEnum.ESTUDIANTE,
    RolEnum.PERSONAL
  ),
  Controller.findByUser
)

router.get(
  '/medico/:medico_id',
  verifyRol(RolEnum.MEDICO, RolEnum.MONITOR),
  Controller.findByMedico
)

router.delete(
  '/:solicitud_id',
  verifyRol(RolEnum.MEDICO),
  Controller.deleteConsulta
)

router.get(
  '/receta/:solicitud_id',
  verifyRol(RolEnum.MEDICO, RolEnum.ESTUDIANTE, RolEnum.PERSONAL),
  verifyResourceReceta,
  Controller.getReceta
)

export default router
