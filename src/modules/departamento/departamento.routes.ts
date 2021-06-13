import { Router } from 'express'
import * as Controller from './departamento.controller'
import { check } from 'express-validator'
import { validateBody, verifyRol, RolEnum } from '../../middlewares'
import passport from '../../libs/passport'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.post(
  '/',
  [
    check('nombre', 'El campo departamento es obligatorio').notEmpty(),
    validateBody,
  ],
  Controller.create
)

router.get('/', verifyRol(RolEnum.ADMINISTRADOR), Controller.findAll)

router.get(
  '/:departamento_id',
  verifyRol(RolEnum.ADMINISTRADOR),
  Controller.findOne
)

router.put(
  '/:departamento_id',
  verifyRol(RolEnum.ADMINISTRADOR),
  Controller.edit
)

router.delete(
  '/:departamento_id',
  verifyRol(RolEnum.ADMINISTRADOR),
  Controller.deleteDepartamento
)

export default router
