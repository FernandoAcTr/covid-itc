import { Router } from 'express'
import { check } from 'express-validator'
import passport from '../../libs/passport'
import { validateBody } from '../../middlewares'
import * as Controller from './tipo_prueba.controller'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.get('/', Controller.findAll)
router.get('/:tipo_id', Controller.findOne)
router.post(
  '/',
  [
    check('descripcion', 'El campo descripcion es obligatorio').notEmpty(),
    validateBody,
  ],
  Controller.store
)
router.put('/:tipo_id', Controller.update)
router.delete('/:tipo_id', Controller.deleteTipo)

export default router
