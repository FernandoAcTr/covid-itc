import { Router } from 'express'
import * as Controller from './usuario.controller'
import { check } from 'express-validator'
import {
  validateBody,
  validateRoles,
  RolEnum,
  verifyRoles,
} from '../../middlewares'
import passport from '../../libs/passport'

const router = Router()

router.post(
  '/login',
  [
    check('email', 'El campo email no es un email valido').isEmail().notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateBody,
  ],
  Controller.login
)

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.get('/', verifyRoles(RolEnum.ADMINISTRADOR), Controller.findAll)
router.get('/:usuario_id', Controller.findOne)

router.delete(
  '/:usuario_id',
  verifyRoles(RolEnum.ADMINISTRADOR),
  Controller.disableUser
)

router.put(
  '/:usuario_id',
  [
    check('email', 'El campo email no es un email valido').optional().isEmail(),
    check('roles').optional().custom(validateRoles),
    validateBody,
  ],
  Controller.updateUser
)

export default router
