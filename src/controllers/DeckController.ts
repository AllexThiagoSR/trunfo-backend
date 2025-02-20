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
}