import { Router } from 'express'
const router = Router()

import RouterStudent from './modules/estudiante/estudiante.routes'
import RouterUser from './modules/user/user.routes'

//importing all routes here
router.use(RouterStudent)
router.use(RouterUser)

export default router
