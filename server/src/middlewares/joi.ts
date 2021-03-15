import { NextFunction, Request, Response } from "express";
import Joi from 'joi'
import { ValidationError } from "../libs/errors";

const joiValidate = (schema: object) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true // ignore unknown props
    };
    const validator = Joi.object(schema)
    const { error } = validator.validate(req, options);
    if (error) {
      throw new ValidationError(error.details.map(x => x.message).join(', '))
    } else {
      next();
    }
  }
}

export default joiValidate
