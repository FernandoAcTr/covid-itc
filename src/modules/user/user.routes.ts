import { Router } from 'express'
import * as Controller from './user.controller'
import { check } from 'express-validator'
import { validateBody } from '../../middlewares/validate_body'
import { validateRoles } from '../../middlewares/express_validators'

const router = Router()

router.post(
  '/login',
  [
    check('email', 'El campo email no es un email valido').isEmail().notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateBody,
  ],
  Controller.login
)

router.get('', Controller.findAll)
router.get('/:usuario_id', Controller.findOne)

router.delete('/:usuario_id', Controller.disableUser)

router.put(
  '/:usuario_id',
  [
    check('email', 'El campo email no es un email valido').optional().isEmail(),
    check('roles').optional().custom(validateRoles),
    validateBody,
  ],
  Controller.updateUser
)

export default router
