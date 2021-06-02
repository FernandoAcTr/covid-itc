import { Router } from 'express'
const router = Router()

import RouterStudent from './modules/estudiante/estudiante.routes'
import RouterUser from './modules/usuario/usuario.routes'
import RouterEncuesta from './modules/encuesta/encuesta.routes'
import RouterPersonal from './modules/personal/personal.routes'
import RouterMedico from './modules/medico/medico.routes'
import RouterAlertas from './modules/alertas/alerta.routes'
import RouterOrden from './modules/ordenes/ordenes.routes'
import RouterSolicitud from './modules/solicitud/solicitud.routes'
import RouterCarrera from './modules/carrera/carrera.routes'
import RouterReportes from './modules/reportes/reportes.routes'
import RouterTrazabilidad from './modules/trazabilidad/trazabilidad.routes'

//importing all routes here
router.use('/estudiantes', RouterStudent)
router.use('/usuarios', RouterUser)
router.use('/encuesta', RouterEncuesta)
router.use('/personal', RouterPersonal)
router.use('/medicos', RouterMedico)
router.use('/alertas', RouterAlertas)
router.use('/ordenes', RouterOrden)
router.use('/consultas', RouterSolicitud)
router.use('/carrera', RouterCarrera)
router.use('/reportes', RouterReportes)
router.use('/trazabilidad', RouterTrazabilidad)

export default router
