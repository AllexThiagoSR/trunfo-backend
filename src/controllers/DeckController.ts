import { Request, Response } from "express";
import DeckService from "../services/DeckService";

export default class DeckController {
  private service: DeckService;

  constructor(service: DeckService = new DeckService()) { this.service = service; }

  public async getAll(_req: Request, res: Response) {
    const response = await this.service.getAll();
    res.status(response.statusCode).json(response.body);
    return;
  }

  public async getById(req: Request, res: Response) {
    const response = await this.service.getById(req.params.id);
    res.status(response.statusCode).json(response.body);
    return;
  }

  public async create(req: Request, res: Response) {
    const response = await this.service.create({ ...req.body, userId: res.locals.user.id});
    res.status(response.statusCode).json(response.body);
    return;
  }
}