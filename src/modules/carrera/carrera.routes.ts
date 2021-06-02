import { Router } from 'express'
import * as Controller from './carrera.controller'
import { check } from 'express-validator'
import {
  validateBody,
  verifyRoles,
  RolEnum,
} from '../../middlewares'
import passport from '../../libs/passport'

const router = Router()  

router.post(
  '/signup',
  [
    check('nombre', 'El campo carrera es obligatorio').notEmpty(),
    validateBody,
  ],
  Controller.signup
)

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.get('/', verifyRoles(RolEnum.ADMINISTRADOR), Controller.findAll)

router.get(
  '/:carrera_id',
  verifyRoles(RolEnum.ADMINISTRADOR),
  Controller.findOne
)

router.put(
  '/:estudiante_id',
  verifyRoles(RolEnum.ESTUDIANTE, RolEnum.ADMINISTRADOR),
  Controller.edit
)

export default router
