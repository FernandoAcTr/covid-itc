import { Router } from 'express'
const router = Router()

import RouterStudent from '../modules/estudiante/estudiante.routes'

//importing all routes here
router.use(RouterStudent)

export default router
