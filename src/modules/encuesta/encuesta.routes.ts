import { Router } from 'express'
import { check } from 'express-validator'
import * as Controller from './encuesta.controller'
import { validateModality } from '../../middlewares/express_validators'
import { validateBody } from '../../middlewares/validate_body'

const router = Router()

router.get('/modalidad', Controller.getModality)
router.post(
  '/modalidad',
  [check('modalidad').custom(validateModality), validateBody],
  Controller.changeModality
)

export default router
