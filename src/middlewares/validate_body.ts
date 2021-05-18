import { Request, Response, NextFunction } from 'express'
import { validationResult, Result, ValidationError } from 'express-validator'

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const errors: Result<ValidationError> = validationResult(req)

  const arrayErrors = errors.array()

  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      message: arrayErrors.map((error) => error.msg),
    })
  }

  next()
}
