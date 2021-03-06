import { Router } from 'express'
import * as Controller from './carrera.controller'
import { check } from 'express-validator'
import { validateBody, verifyRol, RolEnum } from '../../middlewares'
import passport from '../../libs/passport'

const router = Router()

router.get('/', Controller.findAll)

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.post(
  '/',
  [
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check(
      'departamento_id',
      'El campo departamento_id es obligatorio'
    ).notEmpty(),
    validateBody,
  ],
  Controller.store
)

router.get('/:carrera_id', verifyRol(RolEnum.ADMINISTRADOR), Controller.findOne)

router.put('/:carrera_id', verifyRol(RolEnum.ADMINISTRADOR), Controller.edit)

router.delete(
  '/:carrera_id',
  verifyRol(RolEnum.ADMINISTRADOR),
  Controller.deleteCarrera
)

export default router
