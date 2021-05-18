import { Router } from 'express'
import * as Controller from './user.controller'
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
  Controller.login
)

router.get('/usuarios', Controller.findAll)
router.get('/usuarios/:usuario_id', Controller.findOne)

router.delete('/usuarios/:usuario_id', Controller.disableUser)

router.put(
  '/usuarios/:usuario_id',
  [
    check('email', 'El campo email no es un email valido').optional().isEmail(),
    validateBody,
  ],
  Controller.updateUser
)

export default router
