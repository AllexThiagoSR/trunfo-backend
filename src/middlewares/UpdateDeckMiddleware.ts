import { NextFunction, Request, Response } from "express";
import Joi from "joi/lib";
import APIError from "../utils/ApiError";

export default class UpdateDeckMiddleware {
  private static schema = Joi.object({
    name: Joi.string().min(3),
    attributeOne: Joi.string(),
    attributeTwo: Joi.string(),
    attributeThree: Joi.string(),
  });

  static validate(req: Request, _res: Response, next: NextFunction) {
    if (!Object.keys(req.body).length) return next(new APIError('Send at least one field to update.', 400));
    const valid = UpdateDeckMiddleware.schema.validate(req.body);
    if (valid.error) {
      return next(new APIError(valid.error.message, 400));
    }
    next();
  }
}
