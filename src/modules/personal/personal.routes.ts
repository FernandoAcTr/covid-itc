import { Router } from 'express'
import * as Controller from './personal.controller'
import { validateBody, verifyRol, RolEnum } from '../../middlewares'
import { check } from 'express-validator'
import passport from '../../libs/passport'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.post(
  '/signup',
  verifyRol(RolEnum.ADMINISTRADOR),
  [
    check('email', 'El campo email no es un email valido').isEmail().notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('a_materno', 'El campo a_materno es obligatorio').notEmpty(),
    check('a_paterno', 'El campo a_paterno es obligatorio').notEmpty(),
    check('rfc', 'El campo rfc es obligatorio').notEmpty(),
    check(
      'departamento_id',
      'El campo departamento_id es obligatorio'
    ).notEmpty(),
    validateBody,
  ],
  Controller.signup
)

router.get('/', verifyRol(RolEnum.ADMINISTRADOR), Controller.findAll)
router.get(
  '/:personal_id',
  verifyRol(RolEnum.ADMINISTRADOR, RolEnum.PERSONAL),
  Controller.findOne
)

router.put(
  '/:personal_id',
  verifyRol(RolEnum.ADMINISTRADOR, RolEnum.PERSONAL),
  Controller.edit
)

export default router
