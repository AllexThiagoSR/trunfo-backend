import { NextFunction, Request, Response } from "express";
import Joi from "joi/lib";
import APIError from "../utils/ApiError";

export default class UpdateCardMiddleware {
  private static schema = Joi.object({
    name: Joi.string().min(3),
    attributes: Joi.object({
      attributeOne: Joi.number().min(0).max(90),
      attributeTwo: Joi.number().min(0).max(90),
      attributeThree: Joi.number().min(0).max(90),
    }),
    description: Joi.string().min(7),
    image: Joi.string(),
    rarityId: Joi.number(),
    isTrunfo: Joi.boolean()
  });

  static validate(req: Request, _res: Response, next: NextFunction) {
    const valid = UpdateCardMiddleware.schema.validate(req.body)
    if (valid.error) {
      return next(new APIError(valid.error.message, 400));
    }
    next();
  }
}
