import { NextFunction, Request, Response } from "express";
import Joi from "joi/lib";
import APIError from "../utils/ApiError";

export default class CreateDeckMiddleware {
  private static schema = Joi.object({
    name: Joi.string().min(3).required(),
    attributeOne: Joi.string().min(3),
    attributeTwo: Joi.string().min(3),
    attributeThree: Joi.string().min(3),
  });

  static validate(req: Request, _res: Response, next: NextFunction) {
    const valid = CreateDeckMiddleware.schema.validate(req.body)
    if (valid.error) {
      return next(new APIError(valid.error.message, 400));
    }
    next();
  }
}
