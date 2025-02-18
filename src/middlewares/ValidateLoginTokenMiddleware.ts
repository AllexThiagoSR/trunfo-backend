import { NextFunction, Request, Response } from "express";
import JWTUtils from "../utils/JWTUtils";
import APIError from "../utils/ApiError";

export default class ValidateLoginTokenMiddleware {
  private static tokenHandler = new JWTUtils();
  public static validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token || !token.includes('Bearer')) {
        next(new APIError('Invalid token', 401));
        return;
      }
      const payload = ValidateLoginTokenMiddleware.tokenHandler.verify(token.replace('Bearer ', ''));
      res.locals.user = payload;
      
      return next();
    } catch (error) {
      next(error)
    }
  }
}
