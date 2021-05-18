import { Router } from 'express'
import * as Controller from './estudiante.controller'
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
  Controller.signup
)

router.get('/estudiantes/:estudiante_id', Controller.findOne)

//TODO proteger ruta por administrador
router.get('/estudiantes', Controller.findAll)

router.put(
  '/estudiantes/:estudiante_id',
  [
    check('carrera_id', 'El campo carrera_id es obligatorio')
      .optional()
      .custom(existCarrer),
    validateBody,
  ],
  Controller.edit
)

export default router
