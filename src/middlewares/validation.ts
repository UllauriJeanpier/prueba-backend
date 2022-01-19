import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';
 
function validationMiddleware<T>(type: any): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body))
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          let arrayErrors: string[] = []
          errors.forEach((error) => {
            arrayErrors = [
              ...arrayErrors, 
              ...Object.values(error.constraints ?? {})
            ]
          })
          next(new HttpException(400, 'Validate Error', arrayErrors));
        } else {
          next();
        }
      });
  };
}
 
export default validationMiddleware;