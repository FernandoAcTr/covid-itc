import { Router } from 'express'
import * as Controller from './medico.controller'
import { check } from 'express-validator'
import { validateBody } from '../../middlewares/validate_body'

const router = Router()

router.post(
  '/signup',
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
router.get('/', Controller.findAll)
router.get('/:medico_id', Controller.findOne)
router.put('/:medico_id', Controller.edit)
export default router
