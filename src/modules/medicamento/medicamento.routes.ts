import { Router } from 'express'
import * as Controller from './medicamento.controller'
import { check } from 'express-validator'
import { validateBody } from '../../middlewares/validate_body'
import passport from '../../libs/passport'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.get('/', Controller.findAll)
router.get('/:medicamento_id', Controller.findOne)
router.post(
  '/',
  [
    check('descripcion', 'El campo descripcion es obligatorio').notEmpty(),
    validateBody,
  ],
  Controller.store
)
router.put('/:medicamento_id', Controller.update)
router.delete('/:medicamento_id', Controller.deleteMedicamento)

export default router
