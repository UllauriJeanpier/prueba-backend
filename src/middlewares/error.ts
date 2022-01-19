
import { NextFunction, Request, Response } from 'express'
import HttpException from '../exceptions/HttpException'

function errorMiddleware (error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500
  const message = error.msg || 'Something went wrong'
  const errors = error.errors
  return res
    .status(status)
    .json({
      status,
      message,
      errors
    })
}

export default errorMiddleware
