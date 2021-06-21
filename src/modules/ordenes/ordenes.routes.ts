import { Router } from 'express'
import * as Controller from './ordenes.controller'
import { check } from 'express-validator'
import passport from '../../libs/passport'
import {
  validateBody,
  validateOrderResult,
  verifyRol,
  RolEnum,
} from '../../middlewares/'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.post(
  '/',
  verifyRol(RolEnum.MEDICO),
  [
    check('usuario_id', 'El campo usuario_id es obligatorio').notEmpty(),
    check('medico_id', 'El campo medico_id es obligatorio').notEmpty(),
    check('tipo_id', 'El campo tipo_id es obligatorio').notEmpty(),
    validateBody,
  ],
  Controller.createOrden
)

router.get('/', verifyRol(RolEnum.MEDICO, RolEnum.MONITOR), Controller.findAll)
router.get(
  '/:orden_id',
  verifyRol(
    RolEnum.MEDICO,
    RolEnum.MONITOR,
    RolEnum.PERSONAL,
    RolEnum.ESTUDIANTE
  ),
  Controller.findOne
)
router.get(
  '/usuario/:usuario_id',
  verifyRol(
    RolEnum.MEDICO,
    RolEnum.MONITOR,
    RolEnum.PERSONAL,
    RolEnum.ESTUDIANTE
  ),
  Controller.findByUser
)
router.put(
  '/:orden_id',
  verifyRol(RolEnum.MEDICO),
  [check('resultado').optional().custom(validateOrderResult), validateBody],
  Controller.update
)
router.delete('/:orden_id', Controller.deleteOrden)

router.get('/pdf/:orden_id', Controller.getOrdenPDF)

export default router
