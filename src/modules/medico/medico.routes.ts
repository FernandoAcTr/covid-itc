import { Router } from 'express'
import * as Controller from './medico.controller'
import { check } from 'express-validator'
import { validateBody, verifyRoles, RolEnum } from '../../middlewares'
import passport from '../../libs/passport'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.post(
  '/signup',
  verifyRoles(RolEnum.ADMINISTRADOR),
  [
    check('email', 'El campo email no es un email valido').isEmail().notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('a_materno', 'El campo a_materno es obligatorio').notEmpty(),
    check('a_paterno', 'El campo a_paterno es obligatorio').notEmpty(),
    check('cedula', 'El campo cedula es obligatorio').notEmpty(),
    check('rfc', 'El campo rfc es obligatorio').notEmpty(),
    validateBody,
  ],
  Controller.signup
)

router.get('/', verifyRoles(RolEnum.ADMINISTRADOR), Controller.findAll)
router.get(
  '/:medico_id',
  verifyRoles(RolEnum.ADMINISTRADOR, RolEnum.MEDICO),
  Controller.findOne
)
router.put(
  '/:medico_id',
  verifyRoles(RolEnum.ADMINISTRADOR, RolEnum.MEDICO),
  Controller.edit
)
export default router
