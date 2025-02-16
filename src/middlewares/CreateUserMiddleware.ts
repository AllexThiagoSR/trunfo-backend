import { NextFunction, Request, Response } from "express";
import Joi from "joi/lib";
import APIError from "../utils/ApiError";

export default class CreateUserMiddleware {
  private static schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    image: Joi.string(),
  });

  static validate(req: Request, _res: Response, next: NextFunction) {
    const valid = CreateUserMiddleware.schema.validate(req.body)
    if (valid.error) {
      return next(new APIError(valid.error.message, 400));
    }
    next();
  }
}
