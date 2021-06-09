import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import { SolicitudConsulta } from '../entities/solicitud_consulta.entity'
import { RolEnum } from '../entities/rol.entity'

export async function verifyResourceReceta(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user = req.user
  const solicitud_id = req.params.solicitud_id
  const solicitud = await getRepository(SolicitudConsulta).findOne({
    where: { solicitud_id },
    relations: ['usuario'],
  })

  if (
    !solicitud ||
    solicitud.usuario.usuario_id === user?.usuario_id ||
    user?.rol.rol === RolEnum.MEDICO
  ) {
    return next()
  }
  res.json({ statusCode: 403, message: 'Forbidden' })
}
