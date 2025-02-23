import { NextFunction, Request, Response } from "express";
import Joi from "joi/lib";
import APIError from "../utils/ApiError";

export default class CreateCardMiddleware {
  private static schema = Joi.object({
    name: Joi.string().min(3).required(),
    attributes: Joi.array().items(Joi.number().min(0).max(90)).length(3).required(),
    description: Joi.string().min(7).required(),
    image: Joi.string().required(),
    rarityId: Joi.number().required(),
    isTrunfo: Joi.boolean().required(),
    deckId: Joi.string().required(),
  });

  static validate(req: Request, _res: Response, next: NextFunction) {
    const valid = CreateCardMiddleware.schema.validate(req.body)
    if (valid.error) {
      return next(new APIError(valid.error.message, 400));
    }
    next();
  }
}
