import { Router } from 'express'
import * as Controller from './estudiante.controller'
import { check } from 'express-validator'
import {
  existCarrer,
  validateBody,
  verifyRol,
  RolEnum,
} from '../../middlewares'
import passport from '../../libs/passport'

const router = Router()

router.post(
  '/signup',
  [
    check('email', 'El campo email no es un email valido').isEmail().notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('a_materno', 'El campo a_materno es obligatorio').notEmpty(),
    check('a_paterno', 'El campo a_paterno es obligatorio').notEmpty(),
    check('carrera_id', 'El campo carrera_id es obligatorio')
      .notEmpty()
      .custom(existCarrer),
    validateBody,
  ],
  Controller.signup
)

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.get('/', verifyRol(RolEnum.ADMINISTRADOR), Controller.findAll)
router.get(
  '/:estudiante_id',
  verifyRol(RolEnum.ESTUDIANTE, RolEnum.ADMINISTRADOR),
  Controller.findOne
)
router.put(
  '/:estudiante_id',
  verifyRol(RolEnum.ESTUDIANTE, RolEnum.ADMINISTRADOR),
  Controller.edit
)

export default router
