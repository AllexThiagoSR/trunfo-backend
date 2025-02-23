import { Request, Response } from "express";
import CardService from "../services/CardService";

export default class CardController {
  private service: CardService;

  constructor(service = new CardService()) { this.service = service; }

  async getAll(req: Request, res: Response) {
    const response = await this.service.getAll();
    res.status(response.statusCode).json(response.body);
    return;
  }

  async create(req: Request, res: Response) {
    const response = await this.service.create(req.body, res.locals.user.id);
    res.status(response.statusCode).json(response.body);
    return;
  }
}