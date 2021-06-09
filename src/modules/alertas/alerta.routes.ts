import { Router } from 'express'
import AlertaController from './alerta.controller'
import { check } from 'express-validator'
import passport from '../../libs/passport'
import {
  validateBody,
  validateAlertStatus,
  verifyRol,
  RolEnum,
} from '../../middlewares'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

// ---------------------- Alerts -------------------------------------
router.post(
  '/',
  verifyRol(RolEnum.MEDICO, RolEnum.MONITOR),
  [
    check('usuario_id', 'El campo usuario_id es obligatorio').notEmpty(),
    check('alerta', 'El campo alerta es obligatorio').notEmpty(),
    validateBody,
  ],
  AlertaController.createAlert
)
router.put(
  '/:alerta_id',
  verifyRol(RolEnum.MEDICO, RolEnum.MONITOR),
  [check('status').optional().custom(validateAlertStatus), validateBody],
  AlertaController.update
)
router.delete(
  '/:alerta_id',
  verifyRol(RolEnum.MEDICO, RolEnum.MONITOR),
  AlertaController.delete
)

router.get(
  '/usuario/:usuario_id',
  verifyRol(
    RolEnum.MEDICO,
    RolEnum.MONITOR,
    RolEnum.ESTUDIANTE,
    RolEnum.PERSONAL
  ),
  AlertaController.findUserAlerts
)
router.put(
  '/read/:alerta_id',
  verifyRol(RolEnum.ESTUDIANTE, RolEnum.PERSONAL),
  AlertaController.read
)

export default router
