import { Router } from 'express'
import * as Contoller from './user.controller'
import { check } from 'express-validator'
import { validateBody } from '../../middlewares/validate_body'

const router = Router()

router.post(
  '/usuarios/login',
  [
    check('email', 'El campo email no es un email valido').isEmail().notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateBody,
  ],
  Contoller.login
)

export default router
