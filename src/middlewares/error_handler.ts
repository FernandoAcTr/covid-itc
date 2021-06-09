import { Request, Response, NextFunction } from 'express'

export class ErrorHandler extends Error {
  statusCode: number
  message: string

  constructor(statusCode: number, message: string) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

export const handleErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(err)

  const statusCode = err instanceof ErrorHandler ? err.statusCode : 500
  const message = err.message
  res.status(statusCode).json({
    statusCode,
    message,
  })
}
