import { Request, Response, NextFunction } from 'express'
export { RolEnum } from '../entities/rol.entity'

//TODO descomentar validacion de roles
export function verifyRol(...roles: Array<string>) {
  return (req: Request, res: Response, next: NextFunction) => {
    // const userRoles = req.user?.roles

    // if (userRoles?.some((role) => roles.includes(role.rol))) {
    //   return next()
    // }
    // res.status(401).json({ statusCode: 401, message: 'Unauthorized' })
    next()
  }
}
