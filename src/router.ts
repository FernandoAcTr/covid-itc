import { Router } from 'express'
const router = Router()

import RouterStudent from './modules/estudiante/estudiante.routes'
import RouterUser from './modules/user/user.routes'
import RouterEncuesta from './modules/encuesta/encuesta.routes'

//importing all routes here
router.use(RouterStudent)
router.use(RouterUser)
router.use(RouterEncuesta)

export default router
