import { Router } from 'express'
import * as Contoller from './estudiante.controller'
import { check } from 'express-validator'
import { existCarrer } from '../../middlewares/express_validators'
import { validateBody } from '../../middlewares/validate_body'

const router = Router()

router.post(
  '/estudiantes/signup',
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
  Contoller.signup
)

export default router