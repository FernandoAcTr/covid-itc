import { Router } from 'express'
import AlertaController from './alerta.controller'
import { check } from 'express-validator'
import {
  validateBody,
  validateAlertStatus,
  verifyRoles,
  RolEnum,
} from '../../middlewares'
import passport from '../../libs/passport'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

// ---------------------- Alerts -------------------------------------
router.get(
  '/',
  verifyRoles(RolEnum.MEDICO, RolEnum.MONITOR),
  AlertaController.findAll
)
router.get(
  '/:alerta_id',
  verifyRoles(
    RolEnum.MONITOR,
    RolEnum.PERSONAL,
    RolEnum.ESTUDIANTE,
    RolEnum.MEDICO
  ),
  AlertaController.findOne
)
router.post(
  '/',
  verifyRoles(RolEnum.MEDICO, RolEnum.MONITOR),
  [
    check('usuario_id', 'El campo usuario_id es obligatorio').notEmpty(),
    check('alerta', 'El campo alerta es obligatorio').notEmpty(),
    validateBody,
  ],
  AlertaController.createAlert
)
router.put(
  '/:alerta_id',
  verifyRoles(RolEnum.MEDICO, RolEnum.MONITOR),
  [check('status').optional().custom(validateAlertStatus), validateBody],
  AlertaController.update
)
router.delete(
  '/:alerta_id',
  verifyRoles(RolEnum.MEDICO, RolEnum.MONITOR),
  AlertaController.delete
)

router.get(
  '/usuario/:usuario_id',
  verifyRoles(
    RolEnum.MEDICO,
    RolEnum.MONITOR,
    RolEnum.ESTUDIANTE,
    RolEnum.PERSONAL
  ),
  AlertaController.findUserAlerts
)
router.put(
  '/read/:alerta_id',
  verifyRoles(RolEnum.ESTUDIANTE, RolEnum.PERSONAL),
  AlertaController.read
)

export default router
