import { Router } from 'express'
import * as Controller from './ordenes.controller'
import { check } from 'express-validator'
import { validateBody } from '../../middlewares/validate_body'
import { validateOrderResult } from '../../middlewares/express_validators'

const router = Router()

router.post(
  '/',
  [
    check('usuario_id', 'El campo usuario_id es obligatorio').notEmpty(),
    check('medico_id', 'El campo medico_id es obligatorio').notEmpty(),
    check('tipo_id', 'El campo tipo_id es obligatorio').notEmpty(),
    validateBody,
  ],
  Controller.createorden
)

router.get('/', Controller.findAll)
router.get('/:orden_id', Controller.findOne)
router.get('/usuario/:usuario_id', Controller.findByUser)
router.put(
  '/:orden_id',
  [check('resultado').custom(validateOrderResult), validateBody],
  Controller.update
)
router.delete('/:orden_id', Controller.deleteOrden)

export default router
