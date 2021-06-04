import { Router } from 'express'
import * as Controller from './carrera.controller'
import { check } from 'express-validator'
import { validateBody, verifyRol, RolEnum } from '../../middlewares'
import passport from '../../libs/passport'

const router = Router()

// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.post(
  '/',
  [
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check(
      'departamento_id',
      'El campo departamento_id es obligatorio'
    ).notEmpty(),
    validateBody,
  ],
  Controller.store
)

router.get('/', verifyRol(RolEnum.ADMINISTRADOR), Controller.findAll)

router.get('/:carrera_id', verifyRol(RolEnum.ADMINISTRADOR), Controller.findOne)

router.put('/:carrera_id', verifyRol(RolEnum.ADMINISTRADOR), Controller.edit)

router.delete('/:carrera_id', Controller.deleteCarrera)

export default router
