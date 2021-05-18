import { Router } from 'express'
import * as Controller from './personal.controller'
import { validateBody } from '../../middlewares/validate_body'
import { check } from 'express-validator'

const router = Router()

router.post(
  '/personal/signup',
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

router.get('/personal', Controller.findAll)
router.get('/personal/:personal_id', Controller.findOne)

router.put('/personal/:personal_id', Controller.edit)

export default router
