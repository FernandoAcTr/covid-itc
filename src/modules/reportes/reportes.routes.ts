import { Router } from 'express'
import * as Controller from './reportes.controller'

const router = Router()

router.get('/casos_detectados', Controller.getCasosDetectados)
router.get('/total_casos', Controller.getTotalCasos)
router.get('/total_encuestas', Controller.getTotalEncuestas)
router.get('/total_consultas', Controller.getTotalConsultas)

export default router
