import { NextFunction, Request, Response } from 'express'

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
) => {
  console.log(err)

  let statusCode, message
  statusCode = err instanceof ErrorHandler ? err.statusCode : 500
  message = err.message
  res.status(statusCode).json({
    statusCode,
    message,
  })
}
