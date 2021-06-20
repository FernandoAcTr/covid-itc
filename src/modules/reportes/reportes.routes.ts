import { Router } from 'express'
import * as Controller from './reportes.controller'
import passport from '../../libs/passport'

const router = Router()
// ---------------------- Auth -------------------------------------
router.use(passport.authenticate('jwt', { session: false }))

router.get('/casos_detectados', Controller.getCasosDetectados)
router.get('/casos_detectados/pdf', Controller.getCasosDetectadosPDF)
router.get('/total_casos', Controller.getTotalCasos)
router.get('/total_encuestas', Controller.getTotalEncuestas)
router.get('/total_consultas', Controller.getTotalConsultas)

export default router
