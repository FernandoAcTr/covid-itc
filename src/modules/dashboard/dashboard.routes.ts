import { Router } from 'express'
import * as Controller from './dashboard.controller'

const router = Router()

router.get('/', Controller.getDashboard)

export default router
