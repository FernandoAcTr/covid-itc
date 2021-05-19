import { Router } from 'express'
import AlertaController from './alerta.controller'
import { check } from 'express-validator'
import { validateBody } from '../../middlewares/validate_body'
import { validateAlertStatus } from '../../middlewares/express_validators'

const router = Router()

router.get('/', AlertaController.findAll)
router.get('/:alerta_id', AlertaController.findOne)
router.post(
  '/',
  [
    check('usuario_id', 'El campo usuario_id es obligatorio').notEmpty(),
    check('alerta', 'El campo alerta es obligatorio').notEmpty(),
    validateBody,
  ],
  AlertaController.createAlert
)
router.put(
  '/:alerta_id',
  [check('status').optional().custom(validateAlertStatus), validateBody],
  AlertaController.update
)
router.delete('/:alerta_id', AlertaController.delete)

router.get('/usuario/:usuario_id', AlertaController.findUserAlerts)
router.put('/read/:alerta_id', AlertaController.read)

export default router
